import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware';
import pool from '../database/db';

const router = Router();

// Get progress data for user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const [plans] = await pool.execute(
      'SELECT day, completed_exercises, completed_meals, meals FROM workout_meal_plans WHERE user_id = ?',
      [userId]
    ) as any[];

    // Calculate progress metrics
    const progress = plans.map((plan: any) => {
      const meals = JSON.parse(plan.meals || '[]');
      const completedMeals = JSON.parse(plan.completed_meals || '[]');
      const completedExercises = JSON.parse(plan.completed_exercises || '[]');
      
      const totalCalories = meals.reduce((sum: number, meal: any) => sum + (meal.calories || 0), 0);
      const consumedCalories = meals
        .filter((meal: any, index: number) => completedMeals.includes(index))
        .reduce((sum: number, meal: any) => sum + (meal.calories || 0), 0);

      return {
        day: plan.day,
        exercisesCompleted: completedExercises.length,
        caloriesConsumed: consumedCalories,
        caloriesTarget: totalCalories,
        mealsCompleted: completedMeals.length,
        totalMeals: meals.length
      };
    });

    res.json({
      message: 'Progress retrieved successfully',
      progress
    });
  } catch (error: any) {
    console.error('Get progress error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to retrieve progress'
    });
  }
});

export default router;

