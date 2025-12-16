import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './progress.html',
  styleUrls: ['./progress.scss']
})
export class ProgressComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
          {
            label: 'Calories Burned',
            data: [300, 450, 200, 500, 400],
          }
        ]
      }
    });
  }
}
