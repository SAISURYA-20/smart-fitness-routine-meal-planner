import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-page">
      <div class="page-header">
        <h1 class="page-title">My Profile 👤</h1>
        <p class="page-subtitle">Manage your personal information and fitness goals</p>
      </div>

      <div class="profile-content">
        <div class="card profile-card">
          <div class="card-header">
            <h3><mat-icon>person</mat-icon> Personal Information</h3>
          </div>
          <div class="card-body">
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
              <div class="form-row">
                <div class="form-group">
                  <label>Full Name</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="name" placeholder="Enter your name">
                    <mat-error>Name is required</mat-error>
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <mat-form-field appearance="outline">
                    <input matInput [value]="user?.email" disabled placeholder="Email">
                  </mat-form-field>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Age</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="age" type="number" placeholder="Your age">
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Gender</label>
                  <mat-form-field appearance="outline">
                    <mat-select formControlName="gender" placeholder="Select gender">
                      <mat-option value="male">Male</mat-option>
                      <mat-option value="female">Female</mat-option>
                      <mat-option value="other">Other</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Height (cm)</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="height" type="number" placeholder="Height in cm">
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Weight (kg)</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="weight" type="number" placeholder="Weight in kg">
                  </mat-form-field>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group full">
                  <label>Fitness Goal</label>
                  <mat-form-field appearance="outline">
                    <mat-select formControlName="goal">
                      <mat-option value="weight_loss">🔥 Weight Loss</mat-option>
                      <mat-option value="muscle_gain">💪 Muscle Gain</mat-option>
                      <mat-option value="maintenance">⚖️ Maintenance</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>
              <button class="save-btn" type="submit" [disabled]="loading || profileForm.invalid">
                <mat-spinner *ngIf="loading" diameter="18"></mat-spinner>
                <mat-icon *ngIf="!loading">check</mat-icon>
                {{ loading ? 'Saving...' : 'Save Changes' }}
              </button>
            </form>
          </div>
        </div>

        <div class="side-cards">
          <div class="card bmi-card" *ngIf="user?.height && user?.weight">
            <div class="card-header"><h3><mat-icon>monitor_weight</mat-icon> BMI Calculator</h3></div>
            <div class="card-body bmi-body">
              <div class="bmi-value">{{ calculateBMI() }}</div>
              <div class="bmi-label" [ngClass]="getBMIClass()">{{ getBMILabel() }}</div>
              <div class="bmi-bar">
                <div class="bmi-marker" [style.left]="getBMIPosition() + '%'"></div>
              </div>
              <div class="bmi-scale">
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
              </div>
            </div>
          </div>

          <div class="card info-card">
            <div class="card-header"><h3><mat-icon>info</mat-icon> Account Info</h3></div>
            <div class="card-body">
              <div class="info-row"><span class="info-label">Account Type</span><span class="info-value badge">{{ user?.role | titlecase }}</span></div>
              <div class="info-row"><span class="info-label">Current Goal</span><span class="info-value">{{ getGoalLabel() }}</span></div>
              <div class="info-row" *ngIf="user?.created_at"><span class="info-label">Member Since</span><span class="info-value">{{ user?.created_at | date:'mediumDate' }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { max-width: 1000px; }
    .page-header { margin-bottom: 24px; }
    .page-title { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
    .page-subtitle { color: #64748b; font-size: 0.9rem; }
    .profile-content { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
    .card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; }
    .card-header { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; }
    .card-header h3 { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; font-weight: 600; color: #1e293b; margin: 0; }
    .card-header mat-icon { font-size: 18px; width: 18px; height: 18px; color: #64748b; }
    .card-body { padding: 20px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
    .form-group { display: flex; flex-direction: column; }
    .form-group.full { grid-column: span 2; }
    .form-group label { font-size: 0.85rem; font-weight: 500; color: #374151; margin-bottom: 6px; }
    mat-form-field { width: 100%; }
    .save-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; margin-top: 8px; }
    .save-btn:hover { background: #1d4ed8; }
    .save-btn:disabled { opacity: 0.7; cursor: not-allowed; }
    .save-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .side-cards { display: flex; flex-direction: column; gap: 20px; }
    .bmi-body { text-align: center; }
    .bmi-value { font-size: 3rem; font-weight: 800; color: #1e293b; }
    .bmi-label { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin: 8px 0 16px; }
    .bmi-label.normal { background: #d1fae5; color: #059669; }
    .bmi-label.underweight { background: #dbeafe; color: #2563eb; }
    .bmi-label.overweight { background: #fef3c7; color: #d97706; }
    .bmi-label.obese { background: #fee2e2; color: #dc2626; }
    .bmi-bar { height: 8px; background: linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444); border-radius: 4px; position: relative; margin-bottom: 8px; }
    .bmi-marker { position: absolute; top: -4px; width: 16px; height: 16px; background: white; border: 3px solid #1e293b; border-radius: 50%; transform: translateX(-50%); }
    .bmi-scale { display: flex; justify-content: space-between; font-size: 0.65rem; color: #64748b; }
    .info-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #64748b; font-size: 0.875rem; }
    .info-value { font-weight: 600; color: #1e293b; }
    .info-value.badge { background: #e0e7ff; color: #4f46e5; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; }
    @media (max-width: 768px) { .profile-content { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } .form-group.full { grid-column: span 1; } }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  user: User | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      age: [null],
      gender: [''],
      height: [null],
      weight: [null],
      goal: ['maintenance', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res) => { this.user = res.user; this.profileForm.patchValue(res.user); },
      error: () => this.snackBar.open('Failed to load profile', 'Close', { duration: 3000 })
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
    this.loading = true;
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => { this.loading = false; this.user = res.user; this.snackBar.open('Profile updated!', 'Close', { duration: 3000 }); },
      error: () => { this.loading = false; this.snackBar.open('Failed to update', 'Close', { duration: 3000 }); }
    });
  }

  calculateBMI(): string {
    if (!this.user?.height || !this.user?.weight) return '0';
    const h = this.user.height / 100;
    return (this.user.weight / (h * h)).toFixed(1);
  }

  getBMIClass(): string {
    const bmi = parseFloat(this.calculateBMI());
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal';
    if (bmi < 30) return 'overweight';
    return 'obese';
  }

  getBMILabel(): string {
    const labels: Record<string, string> = { underweight: 'Underweight', normal: 'Normal', overweight: 'Overweight', obese: 'Obese' };
    return labels[this.getBMIClass()];
  }

  getBMIPosition(): number {
    const bmi = parseFloat(this.calculateBMI());
    if (bmi < 15) return 0;
    if (bmi > 40) return 100;
    return ((bmi - 15) / 25) * 100;
  }

  getGoalLabel(): string {
    const labels: Record<string, string> = { weight_loss: '🔥 Weight Loss', muscle_gain: '💪 Muscle Gain', maintenance: '⚖️ Maintenance' };
    return labels[this.user?.goal || 'maintenance'] || 'Not Set';
  }
}
