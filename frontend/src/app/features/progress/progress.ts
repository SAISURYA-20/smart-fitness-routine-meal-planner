import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Chart from 'chart.js/auto';
import { Api } from '../../core/api';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSnackBarModule],
  templateUrl: './progress.html',
  styleUrls: ['./progress.scss']
})
export class ProgressComponent implements OnInit, AfterViewInit {
  progressData: any[] = [];
  loading = true;
  chart: any;

  constructor(
    private api: Api,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadProgress();
  }

  ngAfterViewInit(): void {
    // Chart will be created after data loads
  }

  loadProgress() {
    this.loading = true;
    this.api.getProgress().subscribe({
      next: (response: any) => {
        this.loading = false;
        this.progressData = response.progress || [];
        this.createChart();
      },
      error: (error) => {
        this.loading = false;
        // Use default data
        this.progressData = [
          { day: 'Monday', caloriesConsumed: 300, caloriesTarget: 1200 },
          { day: 'Tuesday', caloriesConsumed: 450, caloriesTarget: 1200 },
          { day: 'Wednesday', caloriesConsumed: 200, caloriesTarget: 1200 },
          { day: 'Thursday', caloriesConsumed: 500, caloriesTarget: 1200 },
          { day: 'Friday', caloriesConsumed: 400, caloriesTarget: 1200 }
        ];
        this.createChart();
      }
    });
  }

  createChart() {
    setTimeout(() => {
      const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
      if (!ctx) return;

      if (this.chart) {
        this.chart.destroy();
      }

      const labels = this.progressData.map((p: any) => p.day.substring(0, 3));
      const consumed = this.progressData.map((p: any) => p.caloriesConsumed || 0);
      const target = this.progressData.map((p: any) => p.caloriesTarget || 0);

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Calories Consumed',
              data: consumed,
              backgroundColor: 'rgba(255, 112, 67, 0.6)',
              borderColor: 'rgba(255, 112, 67, 1)',
              borderWidth: 1
            },
            {
              label: 'Calories Target',
              data: target,
              backgroundColor: 'rgba(25, 118, 210, 0.6)',
              borderColor: 'rgba(25, 118, 210, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }, 100);
  }
}
