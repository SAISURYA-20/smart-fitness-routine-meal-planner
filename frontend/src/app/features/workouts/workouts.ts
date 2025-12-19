import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Api } from '../../core/api';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatSnackBarModule],
  templateUrl: './workouts.html',
  styleUrls: ['./workouts.scss']
})
export class WorkoutsComponent implements OnInit {
  workouts: any[] = [];
  loading = true;

  constructor(
    private api: Api,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.loading = true;
    this.api.getWorkouts().subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.workouts && response.workouts.length > 0) {
          this.workouts = response.workouts.map((plan: any) => ({
            day: plan.day,
            exercises: JSON.parse(plan.exercises || '[]'),
            completed_exercises: JSON.parse(plan.completed_exercises || '[]')
          }));
        } else {
          // Fallback to default workouts if none exist
          this.workouts = [
            { day: 'Monday', exercises: ['Push-ups', 'Squats', 'Plank'], completed_exercises: [] },
            { day: 'Tuesday', exercises: ['Jogging', 'Lunges', 'Crunches'], completed_exercises: [] },
            { day: 'Wednesday', exercises: ['Rest Day'], completed_exercises: [] },
            { day: 'Thursday', exercises: ['Pull-ups', 'Deadlift', 'Plank'], completed_exercises: [] },
            { day: 'Friday', exercises: ['Cycling', 'Leg Press', 'Sit-ups'], completed_exercises: [] },
            { day: 'Saturday', exercises: ['Swimming', 'Yoga', 'Stretching'], completed_exercises: [] },
            { day: 'Sunday', exercises: ['Light Walk', 'Meditation', 'Rest Day'], completed_exercises: [] }
          ];
        }
      },
      error: (error) => {
        this.loading = false;
        // Use default workouts on error
        this.workouts = [
          { day: 'Monday', exercises: ['Push-ups', 'Squats', 'Plank'], completed_exercises: [] },
          { day: 'Tuesday', exercises: ['Jogging', 'Lunges', 'Crunches'], completed_exercises: [] },
          { day: 'Wednesday', exercises: ['Rest Day'], completed_exercises: [] },
          { day: 'Thursday', exercises: ['Pull-ups', 'Deadlift', 'Plank'], completed_exercises: [] },
          { day: 'Friday', exercises: ['Cycling', 'Leg Press', 'Sit-ups'], completed_exercises: [] },
          { day: 'Saturday', exercises: ['Swimming', 'Yoga', 'Stretching'], completed_exercises: [] },
          { day: 'Sunday', exercises: ['Light Walk', 'Meditation', 'Rest Day'], completed_exercises: [] }
        ];
      }
    });
  }

  onExerciseChange(day: string, exerciseIndex: number, checked: boolean) {
    const workout = this.workouts.find(w => w.day === day);
    if (!workout) return;

    let completed = [...(workout.completed_exercises || [])];
    if (checked) {
      if (!completed.includes(exerciseIndex)) {
        completed.push(exerciseIndex);
      }
    } else {
      completed = completed.filter((i: number) => i !== exerciseIndex);
    }

    workout.completed_exercises = completed;

    this.api.updateWorkoutStatus(day, { completed_exercises: completed }).subscribe({
      next: () => {
        // Success - already updated locally
      },
      error: (error) => {
        this.snackBar.open('Failed to update workout status', 'Close', { duration: 3000 });
        // Revert change
        if (checked) {
          completed = completed.filter((i: number) => i !== exerciseIndex);
        } else {
          completed.push(exerciseIndex);
        }
        workout.completed_exercises = completed;
      }
    });
  }

  isExerciseCompleted(day: string, exerciseIndex: number): boolean {
    const workout = this.workouts.find(w => w.day === day);
    return workout?.completed_exercises?.includes(exerciseIndex) || false;
  }
}
