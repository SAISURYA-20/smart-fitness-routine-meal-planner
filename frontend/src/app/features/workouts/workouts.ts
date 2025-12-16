import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './workouts.html',
  styleUrls: ['./workouts.scss']
})
export class WorkoutsComponent {

  workouts = [
    {
      day: 'Monday',
      exercises: ['Push-ups', 'Squats', 'Plank']
    },
    {
      day: 'Tuesday',
      exercises: ['Jogging', 'Lunges', 'Crunches']
    },
    {
      day: 'Wednesday',
      exercises: ['Rest Day']
    },
    {
      day: 'Thursday',
      exercises: ['Pull-ups', 'Deadlift', 'Plank']
    },
    {
      day: 'Friday',
      exercises: ['Cycling', 'Leg Press', 'Sit-ups']
    }
  ];
}
