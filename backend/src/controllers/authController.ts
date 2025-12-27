import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { User } from '../types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name, age, gender, height, weight, goal, role } = req.body;

    const [existing] = await pool.query<RowDataPacket[]>('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userRole = role === 'trainer' || role === 'admin' ? role : 'user';
    const userGoal = goal || 'maintenance';

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO users (email, password, name, age, gender, height, weight, goal, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email, 
        hashedPassword, 
        name, 
        age || null, 
        gender || null, 
        height || null, 
        weight || null, 
        userGoal, 
        userRole
      ]
    );

    const token = jwt.sign(
      { userId: result.insertId, email, role: userRole },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { 
        id: result.insertId, 
        email, 
        name, 
        role: userRole, 
        goal: userGoal,
        age: age || null,
        gender: gender || null,
        height: height || null,
        weight: weight || null
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      throw new AppError('Invalid email or password', 401);
    }

    const user = users[0] as User;
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const [users] = await pool.query<RowDataPacket[]>(
      'SELECT id, email, name, age, gender, height, weight, goal, role, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      throw new AppError('User not found', 404);
    }

    res.json({ user: users[0] });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { name, age, gender, height, weight, goal } = req.body;

    await pool.query(
      `UPDATE users SET name = ?, age = ?, gender = ?, height = ?, weight = ?, goal = ? WHERE id = ?`,
      [name, age || null, gender || null, height || null, weight || null, goal, userId]
    );

    const [users] = await pool.query<RowDataPacket[]>(
      'SELECT id, email, name, age, gender, height, weight, goal, role FROM users WHERE id = ?',
      [userId]
    );

    res.json({ message: 'Profile updated successfully', user: users[0] });
  } catch (error) {
    next(error);
  }
};
