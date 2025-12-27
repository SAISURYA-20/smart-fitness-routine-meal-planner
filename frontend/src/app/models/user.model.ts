export interface User {
  id: number;
  email: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  role: 'user' | 'trainer' | 'admin';
  created_at?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
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

export interface DayPlan {
  id: number;
  user_id: number;
  day: string;
  exercises: Exercise[];
  meals: Meal[];
  completed_status: CompletedStatus;
}

export interface DayProgress {
  day: string;
  exerciseProgress: number;
  mealProgress: number;
  completedExercises: number;
  totalExercises: number;
  consumedMeals: number;
  totalMeals: number;
  consumedCalories: number;
  targetCalories: number;
}

export interface ProgressSummary {
  overallExerciseProgress: number;
  overallMealProgress: number;
  targetCalories: number;
}
