import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlanService } from '../../services/plan.service';
import { User, ProgressSummary, DayProgress } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Welcome back, {{ getUserFirstName() }}! 👋</h1>
          <p class="page-subtitle">Here's your fitness overview for today</p>
        </div>
        <button class="generate-btn" (click)="generatePlan()" [disabled]="generating">
          <mat-spinner *ngIf="generating" diameter="18"></mat-spinner>
          <mat-icon *ngIf="!generating">auto_awesome</mat-icon>
          <span>{{ generating ? 'Generating...' : 'Generate Plan' }}</span>
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon blue"><mat-icon>fitness_center</mat-icon></div>
            <span class="stat-trend up">+12%</span>
          </div>
          <div class="stat-value">{{ summary.overallExerciseProgress }}%</div>
          <div class="stat-label">Workout Progress</div>
          <div class="stat-bar">
            <div class="stat-bar-fill blue" [style.width.%]="summary.overallExerciseProgress"></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon green"><mat-icon>restaurant</mat-icon></div>
            <span class="stat-trend up">+8%</span>
          </div>
          <div class="stat-value">{{ summary.overallMealProgress }}%</div>
          <div class="stat-label">Nutrition Progress</div>
          <div class="stat-bar">
            <div class="stat-bar-fill green" [style.width.%]="summary.overallMealProgress"></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon orange"><mat-icon>local_fire_department</mat-icon></div>
          </div>
          <div class="stat-value">{{ summary.targetCalories }}</div>
          <div class="stat-label">Daily Calorie Target</div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon purple"><mat-icon>{{ getGoalIcon() }}</mat-icon></div>
          </div>
          <div class="stat-value goal-text">{{ getGoalLabel() }}</div>
          <div class="stat-label">Current Goal</div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="content-row">
        <!-- Weekly Overview -->
        <div class="card weekly-card">
          <div class="card-header">
            <h3><mat-icon>calendar_today</mat-icon> Weekly Overview</h3>
          </div>
          <div class="card-body">
            <div class="week-grid">
              <div *ngFor="let day of progress" class="day-item" [class.today]="isToday(day.day)">
                <span class="day-name">{{ day.day.substring(0, 3) }}</span>
                <div class="day-ring" [class.complete]="day.exerciseProgress === 100">
                  <svg viewBox="0 0 36 36">
                    <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                    <path class="ring-fill" [attr.stroke-dasharray]="day.exerciseProgress + ', 100'" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  </svg>
                  <mat-icon *ngIf="day.exerciseProgress === 100">check</mat-icon>
                  <span *ngIf="day.exerciseProgress !== 100">{{ day.exerciseProgress }}%</span>
                </div>
                <span class="day-exercises">{{ day.completedExercises }}/{{ day.totalExercises }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card actions-card">
          <div class="card-header">
            <h3><mat-icon>bolt</mat-icon> Quick Actions</h3>
          </div>
          <div class="card-body">
            <a routerLink="/workouts" class="action-item">
              <div class="action-icon blue"><mat-icon>fitness_center</mat-icon></div>
              <div class="action-info">
                <span class="action-title">Start Workout</span>
                <span class="action-desc">View today's exercises</span>
              </div>
              <mat-icon class="action-arrow">chevron_right</mat-icon>
            </a>
            <a routerLink="/meals" class="action-item">
              <div class="action-icon green"><mat-icon>restaurant</mat-icon></div>
              <div class="action-info">
                <span class="action-title">Meal Plan</span>
                <span class="action-desc">Check your nutrition</span>
              </div>
              <mat-icon class="action-arrow">chevron_right</mat-icon>
            </a>
            <a routerLink="/progress" class="action-item">
              <div class="action-icon orange"><mat-icon>insights</mat-icon></div>
              <div class="action-info">
                <span class="action-title">View Progress</span>
                <span class="action-desc">Track achievements</span>
              </div>
              <mat-icon class="action-arrow">chevron_right</mat-icon>
            </a>
            <a routerLink="/profile" class="action-item">
              <div class="action-icon purple"><mat-icon>person</mat-icon></div>
              <div class="action-info">
                <span class="action-title">Edit Profile</span>
                <span class="action-desc">Update your info</span>
              </div>
              <mat-icon class="action-arrow">chevron_right</mat-icon>
            </a>
          </div>
        </div>
      </div>

      <!-- Today's Summary -->
      <div class="card today-card" *ngIf="todayProgress">
        <div class="card-header">
          <h3><mat-icon>today</mat-icon> Today's Summary</h3>
          <span class="today-date">{{ getTodayDate() }}</span>
        </div>
        <div class="card-body">
          <div class="today-grid">
            <div class="today-item">
              <div class="today-label">Exercises</div>
              <div class="today-value">{{ todayProgress.completedExercises }} / {{ todayProgress.totalExercises }}</div>
              <mat-progress-bar mode="determinate" [value]="todayProgress.exerciseProgress"></mat-progress-bar>
            </div>
            <div class="today-item">
              <div class="today-label">Meals</div>
              <div class="today-value">{{ todayProgress.consumedMeals }} / {{ todayProgress.totalMeals }}</div>
              <mat-progress-bar mode="determinate" [value]="todayProgress.mealProgress" color="accent"></mat-progress-bar>
            </div>
            <div class="today-item">
              <div class="today-label">Calories</div>
              <div class="today-value">{{ todayProgress.consumedCalories }} / {{ todayProgress.targetCalories }} kcal</div>
              <mat-progress-bar mode="determinate" [value]="getCalorieProgress()" color="warn"></mat-progress-bar>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page { max-width: 1200px; }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 4px;
    }

    .page-subtitle { color: #64748b; font-size: 0.9rem; }

    .generate-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .generate-btn:hover { background: #1d4ed8; }
    .generate-btn:disabled { opacity: 0.7; cursor: not-allowed; }
    .generate-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px;
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon mat-icon { font-size: 20px; color: white; }
    .stat-icon.blue { background: #2563eb; }
    .stat-icon.green { background: #10b981; }
    .stat-icon.orange { background: #f59e0b; }
    .stat-icon.purple { background: #8b5cf6; }

    .stat-trend {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 10px;
    }

    .stat-trend.up { background: #d1fae5; color: #059669; }

    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 2px;
    }

    .stat-value.goal-text { font-size: 1.25rem; }

    .stat-label { font-size: 0.8rem; color: #64748b; margin-bottom: 10px; }

    .stat-bar {
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
    }

    .stat-bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.3s;
    }

    .stat-bar-fill.blue { background: #2563eb; }
    .stat-bar-fill.green { background: #10b981; }

    .content-row {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
    }

    .card-header {
      padding: 16px 20px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .card-header h3 mat-icon { font-size: 18px; color: #64748b; }

    .card-body { padding: 16px 20px; }

    .week-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
    }

    .day-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 6px;
      border-radius: 8px;
      transition: background 0.15s;
    }

    .day-item.today { background: #eff6ff; }

    .day-name { font-size: 0.7rem; font-weight: 600; color: #64748b; }

    .day-ring {
      width: 44px;
      height: 44px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .day-ring svg {
      position: absolute;
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .ring-bg { fill: none; stroke: #e2e8f0; stroke-width: 3; }
    .ring-fill { fill: none; stroke: #2563eb; stroke-width: 3; stroke-linecap: round; }
    .day-ring.complete .ring-fill { stroke: #10b981; }

    .day-ring span { font-size: 0.65rem; font-weight: 600; color: #64748b; }
    .day-ring mat-icon { font-size: 16px; color: #10b981; }

    .day-exercises { font-size: 0.65rem; color: #94a3b8; }

    .action-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.15s;
      margin-bottom: 6px;
    }

    .action-item:last-child { margin-bottom: 0; }
    .action-item:hover { background: #f8fafc; }

    .action-icon {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-icon mat-icon { font-size: 18px; color: white; }
    .action-icon.blue { background: #2563eb; }
    .action-icon.green { background: #10b981; }
    .action-icon.orange { background: #f59e0b; }
    .action-icon.purple { background: #8b5cf6; }

    .action-info { flex: 1; }
    .action-title { display: block; font-weight: 600; color: #1e293b; font-size: 0.875rem; }
    .action-desc { display: block; font-size: 0.75rem; color: #64748b; }
    .action-arrow { color: #cbd5e1; }

    .today-date { font-size: 0.8rem; color: #64748b; }

    .today-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .today-item { }
    .today-label { font-size: 0.8rem; color: #64748b; margin-bottom: 4px; }
    .today-value { font-size: 1rem; font-weight: 600; color: #1e293b; margin-bottom: 8px; }

    @media (max-width: 1024px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .content-row { grid-template-columns: 1fr; }
      .today-grid { grid-template-columns: 1fr; gap: 16px; }
    }

    @media (max-width: 600px) {
      .stats-grid { grid-template-columns: 1fr; }
      .week-grid { grid-template-columns: repeat(4, 1fr); }
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  summary: ProgressSummary = { overallExerciseProgress: 0, overallMealProgress: 0, targetCalories: 0 };
  progress: DayProgress[] = [];
  todayProgress: DayProgress | null = null;
  generating = false;

  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(res => this.user = res.user);
    this.loadProgress();
  }

  loadProgress(): void {
    this.planService.getProgress().subscribe({
      next: (res) => {
        this.summary = res.summary;
        this.progress = res.progress;
        this.setTodayProgress();
      }
    });
  }

  setTodayProgress(): void {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    this.todayProgress = this.progress.find(p => p.day === today) || null;
  }

  generatePlan(): void {
    this.generating = true;
    this.planService.generatePlan().subscribe({
      next: () => {
        this.generating = false;
        this.loadProgress();
        this.snackBar.open('Plan generated successfully!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.generating = false;
        this.snackBar.open('Failed to generate plan', 'Close', { duration: 3000 });
      }
    });
  }

  getUserFirstName(): string {
    return this.user?.name?.split(' ')[0] || 'User';
  }

  getGoalIcon(): string {
    const icons: Record<string, string> = { weight_loss: 'local_fire_department', muscle_gain: 'fitness_center', maintenance: 'balance' };
    return icons[this.user?.goal || 'maintenance'] || 'flag';
  }

  getGoalLabel(): string {
    const labels: Record<string, string> = { weight_loss: 'Weight Loss', muscle_gain: 'Muscle Gain', maintenance: 'Maintenance' };
    return labels[this.user?.goal || 'maintenance'] || 'Not Set';
  }

  isToday(day: string): boolean {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()] === day;
  }

  getTodayDate(): string {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  }

  getCalorieProgress(): number {
    if (!this.todayProgress) return 0;
    return Math.min(100, Math.round((this.todayProgress.consumedCalories / this.todayProgress.targetCalories) * 100));
  }
}
