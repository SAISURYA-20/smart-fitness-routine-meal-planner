import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware';
import pool from '../database/db';

const router = Router();

// Get workouts for user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const [plans] = await pool.execute(
      'SELECT * FROM workout_meal_plans WHERE user_id = ? ORDER BY FIELD(day, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")',
      [userId]
    ) as any[];

    res.json({
      message: 'Workouts retrieved successfully',
      workouts: plans
    });
  } catch (error: any) {
    console.error('Get workouts error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to retrieve workouts'
    });
  }
});

// Update workout completion status
router.put('/:day', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { day } = req.params;
    const { completed_exercises } = req.body;

    if (!completed_exercises || !Array.isArray(completed_exercises)) {
      return res.status(400).json({ 
        error: 'Invalid data',
        message: 'completed_exercises must be an array'
      });
    }

    await pool.execute(
      'UPDATE workout_meal_plans SET completed_exercises = ? WHERE user_id = ? AND day = ?',
      [JSON.stringify(completed_exercises), userId, day]
    );

    res.json({
      message: 'Workout status updated successfully'
    });
  } catch (error: any) {
    console.error('Update workout error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to update workout status'
    });
  }
});

export default router;

