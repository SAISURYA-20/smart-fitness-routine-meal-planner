import { Router } from 'express';
import { body, param } from 'express-validator';
import { generatePlan, getWeeklyPlan, getDayPlan, markExerciseComplete, markMealConsumed, getProgress } from '../controllers/planController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

router.post('/generate', authenticate, generatePlan);

router.get('/weekly', authenticate, getWeeklyPlan);

router.get('/day/:day', authenticate, [
  param('day').isIn(validDays).withMessage('Invalid day'),
  validateRequest
], getDayPlan);

router.post('/exercise/complete', authenticate, [
  body('day').isIn(validDays).withMessage('Invalid day'),
  body('exerciseId').notEmpty().withMessage('Exercise ID is required'),
  validateRequest
], markExerciseComplete);

router.post('/meal/consume', authenticate, [
  body('day').isIn(validDays).withMessage('Invalid day'),
  body('mealId').notEmpty().withMessage('Meal ID is required'),
  validateRequest
], markMealConsumed);

router.get('/progress', authenticate, getProgress);

export default router;
