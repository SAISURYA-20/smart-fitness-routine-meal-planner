import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Api } from '../../core/api';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatSnackBarModule],
  templateUrl: './meals.html',
  styleUrls: ['./meals.scss']
})
export class MealsComponent implements OnInit {
  mealPlan: any[] = [];
  loading = true;

  constructor(
    private api: Api,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadMeals();
  }

  loadMeals() {
    this.loading = true;
    this.api.getMeals().subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.meals && response.meals.length > 0) {
          this.mealPlan = response.meals.map((plan: any) => ({
            day: plan.day,
            meals: JSON.parse(plan.meals || '[]'),
            completed_meals: JSON.parse(plan.completed_meals || '[]')
          }));
        } else {
          // Fallback to default meals
          this.mealPlan = [
    {
      day: 'Monday',
      meals: [
        { type: 'Breakfast', name: 'Oats & Fruits', calories: 300 },
        { type: 'Lunch', name: 'Rice & Vegetables', calories: 500 },
        { type: 'Dinner', name: 'Grilled Chicken', calories: 400 }
      ]
    },
    {
      day: 'Tuesday',
      meals: [
        { type: 'Breakfast', name: 'Egg Toast', calories: 350 },
        { type: 'Lunch', name: 'Chapati & Dal', calories: 450 },
        { type: 'Dinner', name: 'Salad & Soup', calories: 300 }
      ]
    },
    {
      day: 'Wednesday',
      meals: [
        { type: 'Breakfast', name: 'Smoothie Bowl', calories: 320 },
        { type: 'Lunch', name: 'Brown Rice & Veg Curry', calories: 480 },
        { type: 'Dinner', name: 'Paneer Stir Fry', calories: 380 }
      ]
    },
    {
      day: 'Thursday',
      meals: [
        { type: 'Breakfast', name: 'Idli & Sambar', calories: 350 },
        { type: 'Lunch', name: 'Chicken Rice', calories: 520 },
        { type: 'Dinner', name: 'Vegetable Soup', calories: 300 }
      ]
    },
    {
      day: 'Friday',
      meals: [
        { type: 'Breakfast', name: 'Peanut Butter Toast', calories: 340 },
        { type: 'Lunch', name: 'Curd Rice & Salad', calories: 460 },
        { type: 'Dinner', name: 'Grilled Fish', calories: 390 }
      ]
    },
    {
      day: 'Saturday',
      meals: [
        { type: 'Breakfast', name: 'Upma', calories: 330 },
        { type: 'Lunch', name: 'Veg Biryani', calories: 550 },
        { type: 'Dinner', name: 'Fruit Salad', calories: 280 }
      ]
    },
    {
      day: 'Sunday',
      meals: [
        { type: 'Breakfast', name: 'Dosa & Chutney', calories: 360 },
        { type: 'Lunch', name: 'Chicken Biryani', calories: 600 },
        { type: 'Dinner', name: 'Light Soup', calories: 250 }
      ],
      completed_meals: []
    }];
        }
      },
      error: (error) => {
        this.loading = false;
        // Use default meals on error
        this.mealPlan = [
          { day: 'Monday', meals: [{ type: 'Breakfast', name: 'Oats & Fruits', calories: 300 }, { type: 'Lunch', name: 'Rice & Vegetables', calories: 500 }, { type: 'Dinner', name: 'Grilled Chicken', calories: 400 }], completed_meals: [] },
          { day: 'Tuesday', meals: [{ type: 'Breakfast', name: 'Egg Toast', calories: 350 }, { type: 'Lunch', name: 'Chapati & Dal', calories: 450 }, { type: 'Dinner', name: 'Salad & Soup', calories: 300 }], completed_meals: [] },
          { day: 'Wednesday', meals: [{ type: 'Breakfast', name: 'Smoothie Bowl', calories: 320 }, { type: 'Lunch', name: 'Brown Rice & Veg Curry', calories: 480 }, { type: 'Dinner', name: 'Paneer Stir Fry', calories: 380 }], completed_meals: [] },
          { day: 'Thursday', meals: [{ type: 'Breakfast', name: 'Idli & Sambar', calories: 350 }, { type: 'Lunch', name: 'Chicken Rice', calories: 520 }, { type: 'Dinner', name: 'Vegetable Soup', calories: 300 }], completed_meals: [] },
          { day: 'Friday', meals: [{ type: 'Breakfast', name: 'Peanut Butter Toast', calories: 340 }, { type: 'Lunch', name: 'Curd Rice & Salad', calories: 460 }, { type: 'Dinner', name: 'Grilled Fish', calories: 390 }], completed_meals: [] },
          { day: 'Saturday', meals: [{ type: 'Breakfast', name: 'Upma', calories: 330 }, { type: 'Lunch', name: 'Veg Biryani', calories: 550 }, { type: 'Dinner', name: 'Fruit Salad', calories: 280 }], completed_meals: [] },
          { day: 'Sunday', meals: [{ type: 'Breakfast', name: 'Dosa & Chutney', calories: 360 }, { type: 'Lunch', name: 'Chicken Biryani', calories: 600 }, { type: 'Dinner', name: 'Light Soup', calories: 250 }], completed_meals: [] }
        ];
      }
    });
  }

  onMealChange(day: string, mealIndex: number, checked: boolean) {
    const dayPlan = this.mealPlan.find(m => m.day === day);
    if (!dayPlan) return;

    let completed = [...(dayPlan.completed_meals || [])];
    if (checked) {
      if (!completed.includes(mealIndex)) {
        completed.push(mealIndex);
      }
    } else {
      completed = completed.filter((i: number) => i !== mealIndex);
    }

    dayPlan.completed_meals = completed;

    this.api.updateMealStatus(day, { completed_meals: completed }).subscribe({
      next: () => {
        // Success
      },
      error: (error) => {
        this.snackBar.open('Failed to update meal status', 'Close', { duration: 3000 });
        // Revert
        if (checked) {
          completed = completed.filter((i: number) => i !== mealIndex);
        } else {
          completed.push(mealIndex);
        }
        dayPlan.completed_meals = completed;
      }
    });
  }

  isMealCompleted(day: string, mealIndex: number): boolean {
    const dayPlan = this.mealPlan.find(m => m.day === day);
    return dayPlan?.completed_meals?.includes(mealIndex) || false;
  }

  getTotalCalories(day: string): number {
    const dayPlan = this.mealPlan.find(m => m.day === day);
    if (!dayPlan) return 0;
    return dayPlan.meals.reduce((sum: number, meal: any) => sum + (meal.calories || 0), 0);
  }

  getConsumedCalories(day: string): number {
    const dayPlan = this.mealPlan.find(m => m.day === day);
    if (!dayPlan) return 0;
    return dayPlan.meals
      .filter((meal: any, index: number) => dayPlan.completed_meals.includes(index))
      .reduce((sum: number, meal: any) => sum + (meal.calories || 0), 0);
  }
}
