import { Exercise, Meal } from '../types';

const exerciseDatabase: Record<string, Exercise[]> = {
  weight_loss: [
    { id: 'wl1', name: 'Jumping Jacks', sets: 3, reps: 30, instructions: 'Stand with feet together, jump while spreading arms and legs, return to start.', category: 'cardio' },
    { id: 'wl2', name: 'Burpees', sets: 3, reps: 10, instructions: 'Start standing, drop to push-up, jump back up with arms overhead.', category: 'cardio' },
    { id: 'wl3', name: 'Mountain Climbers', sets: 3, reps: 20, instructions: 'In plank position, alternate bringing knees to chest rapidly.', category: 'cardio' },
    { id: 'wl4', name: 'High Knees', sets: 3, reps: 30, instructions: 'Run in place, bringing knees up to hip level.', category: 'cardio' },
    { id: 'wl5', name: 'Plank', sets: 3, reps: 1, duration: 45, instructions: 'Hold push-up position with arms straight, keep body in line.', category: 'core' },
    { id: 'wl6', name: 'Bicycle Crunches', sets: 3, reps: 20, instructions: 'Lie on back, alternate touching elbow to opposite knee.', category: 'core' },
    { id: 'wl7', name: 'Jump Rope', sets: 3, reps: 1, duration: 60, instructions: 'Jump rope continuously for the duration.', category: 'cardio' },
    { id: 'wl8', name: 'Squat Jumps', sets: 3, reps: 15, instructions: 'Perform a squat, then explosively jump up.', category: 'legs' }
  ],
  muscle_gain: [
    { id: 'mg1', name: 'Push-ups', sets: 4, reps: 15, instructions: 'Keep body straight, lower chest to ground, push back up.', category: 'chest' },
    { id: 'mg2', name: 'Pull-ups', sets: 4, reps: 8, instructions: 'Hang from bar, pull chin above bar, lower with control.', category: 'back' },
    { id: 'mg3', name: 'Squats', sets: 4, reps: 12, instructions: 'Feet shoulder-width, lower until thighs parallel, stand up.', category: 'legs' },
    { id: 'mg4', name: 'Lunges', sets: 4, reps: 10, instructions: 'Step forward, lower back knee toward ground, push back.', category: 'legs' },
    { id: 'mg5', name: 'Dips', sets: 4, reps: 10, instructions: 'Lower body between parallel bars, push back up.', category: 'triceps' },
    { id: 'mg6', name: 'Deadlifts', sets: 4, reps: 8, instructions: 'Hinge at hips, keep back straight, lift weight from ground.', category: 'back' },
    { id: 'mg7', name: 'Shoulder Press', sets: 4, reps: 10, instructions: 'Press weights overhead from shoulder level.', category: 'shoulders' },
    { id: 'mg8', name: 'Bicep Curls', sets: 3, reps: 12, instructions: 'Curl weights toward shoulders, lower with control.', category: 'arms' }
  ],
  maintenance: [
    { id: 'mt1', name: 'Walking', sets: 1, reps: 1, duration: 30, instructions: 'Walk at moderate pace for 30 minutes.', category: 'cardio' },
    { id: 'mt2', name: 'Bodyweight Squats', sets: 3, reps: 15, instructions: 'Standard squat without weights.', category: 'legs' },
    { id: 'mt3', name: 'Push-ups', sets: 3, reps: 10, instructions: 'Standard push-up form.', category: 'chest' },
    { id: 'mt4', name: 'Plank', sets: 3, reps: 1, duration: 30, instructions: 'Hold plank position.', category: 'core' },
    { id: 'mt5', name: 'Stretching', sets: 1, reps: 1, duration: 15, instructions: 'Full body stretching routine.', category: 'flexibility' },
    { id: 'mt6', name: 'Yoga Flow', sets: 1, reps: 1, duration: 20, instructions: 'Basic yoga sequence.', category: 'flexibility' }
  ]
};


const mealDatabase: Record<string, Meal[]> = {
  weight_loss: [
    { id: 'wlm1', name: 'Greek Yogurt with Berries', type: 'breakfast', calories: 250, protein: 15, carbs: 30, fat: 8, ingredients: ['Greek yogurt', 'Mixed berries', 'Honey'] },
    { id: 'wlm2', name: 'Egg White Omelette', type: 'breakfast', calories: 200, protein: 20, carbs: 5, fat: 10, ingredients: ['Egg whites', 'Spinach', 'Tomatoes', 'Mushrooms'] },
    { id: 'wlm3', name: 'Grilled Chicken Salad', type: 'lunch', calories: 350, protein: 35, carbs: 15, fat: 15, ingredients: ['Chicken breast', 'Mixed greens', 'Cucumber', 'Olive oil dressing'] },
    { id: 'wlm4', name: 'Quinoa Buddha Bowl', type: 'lunch', calories: 400, protein: 18, carbs: 50, fat: 12, ingredients: ['Quinoa', 'Chickpeas', 'Roasted vegetables', 'Tahini'] },
    { id: 'wlm5', name: 'Baked Salmon with Vegetables', type: 'dinner', calories: 400, protein: 35, carbs: 20, fat: 18, ingredients: ['Salmon fillet', 'Broccoli', 'Asparagus', 'Lemon'] },
    { id: 'wlm6', name: 'Turkey Stir-Fry', type: 'dinner', calories: 380, protein: 30, carbs: 25, fat: 15, ingredients: ['Ground turkey', 'Bell peppers', 'Zucchini', 'Soy sauce'] },
    { id: 'wlm7', name: 'Apple with Almond Butter', type: 'snack', calories: 180, protein: 5, carbs: 20, fat: 10, ingredients: ['Apple', 'Almond butter'] },
    { id: 'wlm8', name: 'Celery with Hummus', type: 'snack', calories: 100, protein: 4, carbs: 10, fat: 5, ingredients: ['Celery sticks', 'Hummus'] }
  ],
  muscle_gain: [
    { id: 'mgm1', name: 'Protein Pancakes', type: 'breakfast', calories: 500, protein: 35, carbs: 50, fat: 15, ingredients: ['Protein powder', 'Oats', 'Eggs', 'Banana', 'Maple syrup'] },
    { id: 'mgm2', name: 'Steak and Eggs', type: 'breakfast', calories: 600, protein: 45, carbs: 5, fat: 40, ingredients: ['Sirloin steak', 'Eggs', 'Avocado'] },
    { id: 'mgm3', name: 'Chicken Rice Bowl', type: 'lunch', calories: 650, protein: 45, carbs: 70, fat: 15, ingredients: ['Chicken breast', 'Brown rice', 'Black beans', 'Salsa'] },
    { id: 'mgm4', name: 'Tuna Pasta', type: 'lunch', calories: 600, protein: 40, carbs: 65, fat: 18, ingredients: ['Tuna', 'Whole wheat pasta', 'Olive oil', 'Vegetables'] },
    { id: 'mgm5', name: 'Beef Stir-Fry with Rice', type: 'dinner', calories: 700, protein: 50, carbs: 60, fat: 25, ingredients: ['Beef strips', 'Rice', 'Broccoli', 'Teriyaki sauce'] },
    { id: 'mgm6', name: 'Grilled Chicken with Sweet Potato', type: 'dinner', calories: 650, protein: 45, carbs: 55, fat: 20, ingredients: ['Chicken thighs', 'Sweet potato', 'Green beans'] },
    { id: 'mgm7', name: 'Protein Shake', type: 'snack', calories: 300, protein: 30, carbs: 25, fat: 8, ingredients: ['Protein powder', 'Milk', 'Banana', 'Peanut butter'] },
    { id: 'mgm8', name: 'Cottage Cheese with Nuts', type: 'snack', calories: 250, protein: 20, carbs: 10, fat: 15, ingredients: ['Cottage cheese', 'Mixed nuts', 'Honey'] }
  ],
  maintenance: [
    { id: 'mtm1', name: 'Oatmeal with Fruits', type: 'breakfast', calories: 350, protein: 12, carbs: 55, fat: 8, ingredients: ['Oats', 'Milk', 'Banana', 'Blueberries', 'Honey'] },
    { id: 'mtm2', name: 'Avocado Toast with Eggs', type: 'breakfast', calories: 400, protein: 18, carbs: 35, fat: 22, ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Cherry tomatoes'] },
    { id: 'mtm3', name: 'Mediterranean Wrap', type: 'lunch', calories: 450, protein: 25, carbs: 45, fat: 18, ingredients: ['Whole wheat wrap', 'Grilled chicken', 'Feta', 'Olives', 'Lettuce'] },
    { id: 'mtm4', name: 'Vegetable Soup with Bread', type: 'lunch', calories: 380, protein: 15, carbs: 50, fat: 12, ingredients: ['Mixed vegetables', 'Vegetable broth', 'Whole grain bread'] },
    { id: 'mtm5', name: 'Grilled Fish with Quinoa', type: 'dinner', calories: 500, protein: 40, carbs: 40, fat: 18, ingredients: ['White fish', 'Quinoa', 'Roasted vegetables', 'Lemon herb sauce'] },
    { id: 'mtm6', name: 'Chicken Stir-Fry', type: 'dinner', calories: 480, protein: 35, carbs: 45, fat: 16, ingredients: ['Chicken breast', 'Mixed vegetables', 'Brown rice', 'Soy sauce'] },
    { id: 'mtm7', name: 'Greek Yogurt Parfait', type: 'snack', calories: 200, protein: 15, carbs: 25, fat: 5, ingredients: ['Greek yogurt', 'Granola', 'Mixed berries'] },
    { id: 'mtm8', name: 'Trail Mix', type: 'snack', calories: 180, protein: 6, carbs: 15, fat: 12, ingredients: ['Almonds', 'Cashews', 'Dried cranberries', 'Dark chocolate chips'] }
  ]
};


const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const generateWeeklyPlan = (goal: string): { day: string; exercises: Exercise[]; meals: Meal[] }[] => {
  const exercises = exerciseDatabase[goal] || exerciseDatabase.maintenance;
  const meals = mealDatabase[goal] || mealDatabase.maintenance;

  return days.map((day, index) => {
    const dayExercises = getExercisesForDay(exercises, index, goal);
    const dayMeals = getMealsForDay(meals, index);
    return { day, exercises: dayExercises, meals: dayMeals };
  });
};

const getExercisesForDay = (exercises: Exercise[], dayIndex: number, goal: string): Exercise[] => {
  if (dayIndex === 6) return []; // Rest day on Sunday
  
  const numExercises = goal === 'muscle_gain' ? 5 : goal === 'weight_loss' ? 4 : 3;
  const startIndex = (dayIndex * 2) % exercises.length;
  const selected: Exercise[] = [];
  
  for (let i = 0; i < numExercises; i++) {
    selected.push({ ...exercises[(startIndex + i) % exercises.length], id: `${exercises[(startIndex + i) % exercises.length].id}-${dayIndex}` });
  }
  return selected;
};

const getMealsForDay = (meals: Meal[], dayIndex: number): Meal[] => {
  const breakfast = meals.filter(m => m.type === 'breakfast');
  const lunch = meals.filter(m => m.type === 'lunch');
  const dinner = meals.filter(m => m.type === 'dinner');
  const snacks = meals.filter(m => m.type === 'snack');

  return [
    { ...breakfast[dayIndex % breakfast.length], id: `${breakfast[dayIndex % breakfast.length].id}-${dayIndex}` },
    { ...lunch[dayIndex % lunch.length], id: `${lunch[dayIndex % lunch.length].id}-${dayIndex}` },
    { ...dinner[dayIndex % dinner.length], id: `${dinner[dayIndex % dinner.length].id}-${dayIndex}` },
    { ...snacks[dayIndex % snacks.length], id: `${snacks[dayIndex % snacks.length].id}-${dayIndex}` }
  ];
};

export const calculateDailyCalories = (goal: string, weight: number): number => {
  const baseCalories = weight * 24;
  switch (goal) {
    case 'weight_loss': return Math.round(baseCalories * 0.8);
    case 'muscle_gain': return Math.round(baseCalories * 1.2);
    default: return Math.round(baseCalories);
  }
};
