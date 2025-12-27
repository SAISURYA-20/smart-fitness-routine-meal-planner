import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartData } from 'chart.js';
import { PlanService } from '../../services/plan.service';
import { DayProgress, ProgressSummary } from '../../models/user.model';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.scss']
})
export class ProgressTrackerComponent implements OnInit {
  progress: DayProgress[] = [];
  summary: ProgressSummary = { overallExerciseProgress: 0, overallMealProgress: 0, targetCalories: 0 };
  loading = true;
  generating = false;

  exerciseChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  calorieChartData: ChartData<'line'> = { labels: [], datasets: [] };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 100, grid: { color: '#f1f5f9' }, ticks: { callback: (v) => v + '%' } }, x: { grid: { display: false } } }
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } } },
    scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } }
  };

  constructor(private planService: PlanService, private snackBar: MatSnackBar) {}

  ngOnInit(): void { this.loadProgress(); }

  loadProgress(): void {
    this.loading = true;
    this.planService.getProgress().subscribe({
      next: (res) => { this.progress = res.progress || []; this.summary = res.summary; this.setupCharts(); this.loading = false; },
      error: () => { this.progress = []; this.loading = false; }
    });
  }

  generatePlan(): void {
    this.generating = true;
    this.planService.generatePlan().subscribe({
      next: () => { this.generating = false; this.loadProgress(); this.snackBar.open('Plan generated!', 'Close', { duration: 3000 }); },
      error: () => { this.generating = false; this.snackBar.open('Failed to generate', 'Close', { duration: 3000 }); }
    });
  }

  setupCharts(): void {
    const labels = this.progress.map(p => p.day.substring(0, 3));
    this.exerciseChartData = { labels, datasets: [{ data: this.progress.map(p => p.exerciseProgress), backgroundColor: '#6366f1', borderRadius: 6, barThickness: 24 }] };
    this.calorieChartData = { labels, datasets: [
      { data: this.progress.map(p => p.consumedCalories), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4, fill: true, label: 'Consumed', pointBackgroundColor: '#10b981' },
      { data: this.progress.map(p => p.targetCalories), borderColor: '#94a3b8', borderDash: [5, 5], tension: 0, fill: false, label: 'Target', pointBackgroundColor: '#94a3b8' }
    ]};
  }

  getTotalCompletedEx(): number { return this.progress.reduce((s, p) => s + p.completedExercises, 0); }
  getTotalExercises(): number { return this.progress.reduce((s, p) => s + p.totalExercises, 0); }
  getTotalConsumedMeals(): number { return this.progress.reduce((s, p) => s + p.consumedMeals, 0); }
  getTotalMeals(): number { return this.progress.reduce((s, p) => s + p.totalMeals, 0); }
  getAvgCalories(): number { return this.progress.length ? Math.round(this.progress.reduce((s, p) => s + p.consumedCalories, 0) / this.progress.length) : 0; }
  getCompleteDays(): number { return this.progress.filter(p => p.exerciseProgress === 100 && p.mealProgress === 100).length; }
}
