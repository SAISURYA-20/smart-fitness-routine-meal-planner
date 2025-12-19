import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware';
import pool from '../database/db';

const router = Router();

// Get meals for user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const [plans] = await pool.execute(
      'SELECT * FROM workout_meal_plans WHERE user_id = ? ORDER BY FIELD(day, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")',
      [userId]
    ) as any[];

    res.json({
      message: 'Meals retrieved successfully',
      meals: plans
    });
  } catch (error: any) {
    console.error('Get meals error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to retrieve meals'
    });
  }
});

// Update meal completion status
router.put('/:day', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { day } = req.params;
    const { completed_meals } = req.body;

    if (!completed_meals || !Array.isArray(completed_meals)) {
      return res.status(400).json({ 
        error: 'Invalid data',
        message: 'completed_meals must be an array'
      });
    }

    await pool.execute(
      'UPDATE workout_meal_plans SET completed_meals = ? WHERE user_id = ? AND day = ?',
      [JSON.stringify(completed_meals), userId, day]
    );

    res.json({
      message: 'Meal status updated successfully'
    });
  } catch (error: any) {
    console.error('Update meal error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to update meal status'
    });
  }
});

export default router;

