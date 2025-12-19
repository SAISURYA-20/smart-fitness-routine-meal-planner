import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware';
import pool from '../database/db';

const router = Router();

// Get user profile
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const [users] = await pool.execute(
      'SELECT id, name, email, age, gender, height, weight, goal, role, created_at FROM users WHERE id = ?',
      [userId]
    ) as any[];

    if (!users || users.length === 0) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'Profile not found'
      });
    }

    const user = users[0];
    res.json({
      message: 'Profile retrieved successfully',
      user
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to retrieve profile'
    });
  }
});

// Update user profile
router.put('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { name, age, gender, height, weight, goal } = req.body;

    // Validation
    if (!name || !age || !gender || !height || !weight || !goal) {
      return res.status(400).json({ 
        error: 'All fields are required',
        message: 'Please fill in all required fields'
      });
    }

    if (!['weight_loss', 'muscle_gain', 'maintenance'].includes(goal)) {
      return res.status(400).json({ 
        error: 'Invalid goal',
        message: 'Goal must be one of: weight_loss, muscle_gain, maintenance'
      });
    }

    await pool.execute(
      `UPDATE users 
       SET name = ?, age = ?, gender = ?, height = ?, weight = ?, goal = ? 
       WHERE id = ?`,
      [name, age, gender, height, weight, goal, userId]
    );

    res.json({
      message: 'Profile updated successfully'
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to update profile'
    });
  }
});

export default router;

