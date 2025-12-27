export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  role: 'user' | 'trainer' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  instructions: string;
  category: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

export interface CompletedStatus {
  exercises: string[];
  meals: string[];
}

export interface WorkoutMealPlan {
  id: number;
  user_id: number;
  day: string;
  exercises: Exercise[];
  meals: Meal[];
  completed_status: CompletedStatus;
  created_at: Date;
  updated_at: Date;
}

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
