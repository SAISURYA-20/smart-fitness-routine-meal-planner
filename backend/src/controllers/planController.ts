import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { generateWeeklyPlan, calculateDailyCalories } from '../utils/planGenerator';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { User, WorkoutMealPlan, CompletedStatus } from '../types';

export const generatePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const [users] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      throw new AppError('User not found', 404);
    }

    const user = users[0] as User;
    const weeklyPlan = generateWeeklyPlan(user.goal);

    await pool.query('DELETE FROM workout_meal_plans WHERE user_id = ?', [userId]);

    for (const dayPlan of weeklyPlan) {
      const completedStatus: CompletedStatus = { exercises: [], meals: [] };
      await pool.query(
        'INSERT INTO workout_meal_plans (user_id, day, exercises, meals, completed_status) VALUES (?, ?, ?, ?, ?)',
        [userId, dayPlan.day, JSON.stringify(dayPlan.exercises), JSON.stringify(dayPlan.meals), JSON.stringify(completedStatus)]
      );
    }

    res.json({ message: 'Weekly plan generated successfully', plan: weeklyPlan });
  } catch (error) {
    next(error);
  }
};


export const getWeeklyPlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const [plans] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM workout_meal_plans WHERE user_id = ? ORDER BY FIELD(day, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")',
      [userId]
    );

    if (plans.length === 0) {
      res.json({ message: 'No plan found. Generate a new plan.', plan: [] });
      return;
    }

    const formattedPlans = plans.map(plan => ({
      ...plan,
      exercises: typeof plan.exercises === 'string' ? JSON.parse(plan.exercises) : plan.exercises,
      meals: typeof plan.meals === 'string' ? JSON.parse(plan.meals) : plan.meals,
      completed_status: typeof plan.completed_status === 'string' ? JSON.parse(plan.completed_status) : plan.completed_status
    }));

    res.json({ plan: formattedPlans });
  } catch (error) {
    next(error);
  }
};

export const getDayPlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { day } = req.params;

    const [plans] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM workout_meal_plans WHERE user_id = ? AND day = ?',
      [userId, day]
    );

    if (plans.length === 0) {
      throw new AppError('Plan not found for this day', 404);
    }

    const plan = plans[0];
    res.json({
      plan: {
        ...plan,
        exercises: typeof plan.exercises === 'string' ? JSON.parse(plan.exercises) : plan.exercises,
        meals: typeof plan.meals === 'string' ? JSON.parse(plan.meals) : plan.meals,
        completed_status: typeof plan.completed_status === 'string' ? JSON.parse(plan.completed_status) : plan.completed_status
      }
    });
  } catch (error) {
    next(error);
  }
};


export const markExerciseComplete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { day, exerciseId } = req.body;

    const [plans] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM workout_meal_plans WHERE user_id = ? AND day = ?',
      [userId, day]
    );

    if (plans.length === 0) {
      throw new AppError('Plan not found', 404);
    }

    const plan = plans[0];
    const completedStatus: CompletedStatus = typeof plan.completed_status === 'string' 
      ? JSON.parse(plan.completed_status) 
      : plan.completed_status;

    // Toggle: if already completed, remove it; otherwise add it
    const index = completedStatus.exercises.indexOf(exerciseId);
    if (index > -1) {
      completedStatus.exercises.splice(index, 1);
    } else {
      completedStatus.exercises.push(exerciseId);
    }

    await pool.query(
      'UPDATE workout_meal_plans SET completed_status = ? WHERE user_id = ? AND day = ?',
      [JSON.stringify(completedStatus), userId, day]
    );

    res.json({ message: 'Exercise status updated', completed_status: completedStatus });
  } catch (error) {
    next(error);
  }
};

export const markMealConsumed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { day, mealId } = req.body;

    const [plans] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM workout_meal_plans WHERE user_id = ? AND day = ?',
      [userId, day]
    );

    if (plans.length === 0) {
      throw new AppError('Plan not found', 404);
    }

    const plan = plans[0];
    const completedStatus: CompletedStatus = typeof plan.completed_status === 'string' 
      ? JSON.parse(plan.completed_status) 
      : plan.completed_status;

    // Toggle: if already consumed, remove it; otherwise add it
    const index = completedStatus.meals.indexOf(mealId);
    if (index > -1) {
      completedStatus.meals.splice(index, 1);
    } else {
      completedStatus.meals.push(mealId);
    }

    await pool.query(
      'UPDATE workout_meal_plans SET completed_status = ? WHERE user_id = ? AND day = ?',
      [JSON.stringify(completedStatus), userId, day]
    );

    res.json({ message: 'Meal status updated', completed_status: completedStatus });
  } catch (error) {
    next(error);
  }
};


export const getProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const [plans] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM workout_meal_plans WHERE user_id = ? ORDER BY FIELD(day, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")',
      [userId]
    );

    const [users] = await pool.query<RowDataPacket[]>('SELECT goal, weight FROM users WHERE id = ?', [userId]);
    const user = users[0];
    const targetCalories = calculateDailyCalories(user.goal, user.weight || 70);

    const progress = plans.map(plan => {
      const exercises = typeof plan.exercises === 'string' ? JSON.parse(plan.exercises) : plan.exercises;
      const meals = typeof plan.meals === 'string' ? JSON.parse(plan.meals) : plan.meals;
      const completedStatus: CompletedStatus = typeof plan.completed_status === 'string' 
        ? JSON.parse(plan.completed_status) 
        : plan.completed_status;

      const totalExercises = exercises.length;
      const completedExercises = completedStatus.exercises.length;
      const exerciseProgress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

      const totalMeals = meals.length;
      const consumedMeals = completedStatus.meals.length;
      const mealProgress = totalMeals > 0 ? (consumedMeals / totalMeals) * 100 : 0;

      const consumedCalories = meals
        .filter((m: any) => completedStatus.meals.includes(m.id))
        .reduce((sum: number, m: any) => sum + m.calories, 0);

      return {
        day: plan.day,
        exerciseProgress: Math.round(exerciseProgress),
        mealProgress: Math.round(mealProgress),
        completedExercises,
        totalExercises,
        consumedMeals,
        totalMeals,
        consumedCalories,
        targetCalories
      };
    });

    const overallExerciseProgress = progress.length > 0
      ? Math.round(progress.reduce((sum, p) => sum + p.exerciseProgress, 0) / progress.length)
      : 0;

    const overallMealProgress = progress.length > 0
      ? Math.round(progress.reduce((sum, p) => sum + p.mealProgress, 0) / progress.length)
      : 0;

    res.json({
      progress,
      summary: { overallExerciseProgress, overallMealProgress, targetCalories }
    });
  } catch (error) {
    next(error);
  }
};
