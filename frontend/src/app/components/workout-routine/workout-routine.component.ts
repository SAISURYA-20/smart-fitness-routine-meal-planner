import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '../../services/plan.service';
import { DayPlan } from '../../models/user.model';

@Component({
  selector: 'app-workout-routine',
  templateUrl: './workout-routine.component.html',
  styleUrls: ['./workout-routine.component.scss']
})
export class WorkoutRoutineComponent implements OnInit {
  weeklyPlan: DayPlan[] = [];
  loading = true;
  generating = false;
  selectedDay = 0;

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
      next: (res) => { this.weeklyPlan = res.plan || []; this.generating = false; this.setTodayAsDefault(); this.snackBar.open('Workout plan generated!', 'Close', { duration: 3000 }); },
      error: () => { this.generating = false; this.snackBar.open('Failed to generate plan', 'Close', { duration: 3000 }); }
    });
  }

  setTodayAsDefault(): void {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    const index = this.weeklyPlan.findIndex(d => d.day === today);
    if (index >= 0) this.selectedDay = index;
  }

  isCompleted(day: DayPlan, exerciseId: string): boolean {
    return day.completed_status?.exercises?.includes(exerciseId) || false;
  }

  toggleExercise(day: string, exerciseId: string): void {
    this.planService.markExerciseComplete(day, exerciseId).subscribe({
      next: (res) => { const dayPlan = this.weeklyPlan.find(d => d.day === day); if (dayPlan) dayPlan.completed_status = res.completed_status; },
      error: () => this.snackBar.open('Failed to update', 'Close', { duration: 3000 })
    });
  }

  getDayProgress(day: DayPlan): number {
    if (!day.exercises || day.exercises.length === 0) return 100;
    return Math.round(((day.completed_status?.exercises?.length || 0) / day.exercises.length) * 100);
  }

  getTotalCompleted(): number { return this.weeklyPlan.reduce((sum, day) => sum + (day.completed_status?.exercises?.length || 0), 0); }
  getTotalExercises(): number { return this.weeklyPlan.reduce((sum, day) => sum + (day.exercises?.length || 0), 0); }
}
