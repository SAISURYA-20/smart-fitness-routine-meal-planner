import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '../../services/plan.service';
import { DayPlan, Meal } from '../../models/user.model';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss']
})
export class MealPlannerComponent implements OnInit {
  weeklyPlan: DayPlan[] = [];
  loading = true;
  generating = false;
  selectedDay = 0;

  mealTypes = [
    { value: 'breakfast', label: 'Breakfast', icon: 'wb_sunny', color: 'orange' },
    { value: 'lunch', label: 'Lunch', icon: 'wb_twilight', color: 'green' },
    { value: 'dinner', label: 'Dinner', icon: 'nights_stay', color: 'purple' },
    { value: 'snack', label: 'Snacks', icon: 'cookie', color: 'pink' }
  ];

  constructor(private planService: PlanService, private snackBar: MatSnackBar) {}

  ngOnInit(): void { this.loadPlan(); }

  loadPlan(): void {
    this.loading = true;
    this.planService.getWeeklyPlan().subscribe({
      next: (res) => { this.weeklyPlan = res.plan || []; this.loading = false; this.setTodayAsDefault(); },
      error: () => { this.weeklyPlan = []; this.loading = false; }
    });
  }

  generatePlan(): void {
    this.generating = true;
    this.planService.generatePlan().subscribe({
      next: (res) => { this.weeklyPlan = res.plan || []; this.generating = false; this.setTodayAsDefault(); this.snackBar.open('Meal plan generated!', 'Close', { duration: 3000 }); },
      error: () => { this.generating = false; this.snackBar.open('Failed to generate', 'Close', { duration: 3000 }); }
    });
  }

  setTodayAsDefault(): void {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const idx = this.weeklyPlan.findIndex(d => d.day === days[new Date().getDay()]);
    if (idx >= 0) this.selectedDay = idx;
  }

  getMealsByType(day: DayPlan, type: string): Meal[] { return day.meals?.filter(m => m.type === type) || []; }
  isConsumed(day: DayPlan, mealId: string): boolean { return day.completed_status?.meals?.includes(mealId) || false; }

  toggleMeal(day: string, mealId: string): void {
    this.planService.markMealConsumed(day, mealId).subscribe({
      next: (res) => { const d = this.weeklyPlan.find(p => p.day === day); if (d) d.completed_status = res.completed_status; },
      error: () => this.snackBar.open('Failed to update', 'Close', { duration: 3000 })
    });
  }

  getTotalCalories(day: DayPlan): number { return day.meals?.reduce((s, m) => s + m.calories, 0) || 0; }
  getConsumedCalories(day: DayPlan): number { return day.meals?.filter(m => this.isConsumed(day, m.id)).reduce((s, m) => s + m.calories, 0) || 0; }
  getRemainingCalories(day: DayPlan): number { return this.getTotalCalories(day) - this.getConsumedCalories(day); }
  getCalorieProgress(day: DayPlan): number { const t = this.getTotalCalories(day); return t ? Math.min(100, Math.round((this.getConsumedCalories(day) / t) * 100)) : 0; }
  getMealTypeCalories(day: DayPlan, type: string): number { return this.getMealsByType(day, type).reduce((s, m) => s + m.calories, 0); }
  getTotalMacro(day: DayPlan, macro: 'protein' | 'carbs' | 'fat'): number { return day.meals?.filter(m => this.isConsumed(day, m.id)).reduce((s, m) => s + m[macro], 0) || 0; }
  getDayProgress(day: DayPlan): number { if (!day.meals?.length) return 0; return Math.round(((day.completed_status?.meals?.length || 0) / day.meals.length) * 100); }
  getTotalConsumed(): number { return this.weeklyPlan.reduce((s, d) => s + (d.completed_status?.meals?.length || 0), 0); }
  getTotalMeals(): number { return this.weeklyPlan.reduce((s, d) => s + (d.meals?.length || 0), 0); }
}
