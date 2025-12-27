import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-page">
      <div class="page-header">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Manage your account and preferences</p>
      </div>

      <div class="settings-grid">
        <!-- Profile Settings -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><mat-icon>person</mat-icon> Profile Information</h3>
          </div>
          <div class="card-body">
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
              <div class="form-grid">
                <div class="form-group">
                  <label>Full Name</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="name" placeholder="Your name">
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <mat-form-field appearance="outline">
                    <input matInput [value]="user?.email" disabled placeholder="Email">
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Age</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="age" type="number" placeholder="Age">
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Gender</label>
                  <mat-form-field appearance="outline">
                    <mat-select formControlName="gender" placeholder="Select">
                      <mat-option value="male">Male</mat-option>
                      <mat-option value="female">Female</mat-option>
                      <mat-option value="other">Other</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Height (cm)</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="height" type="number" placeholder="Height">
                  </mat-form-field>
                </div>
                <div class="form-group">
                  <label>Weight (kg)</label>
                  <mat-form-field appearance="outline">
                    <input matInput formControlName="weight" type="number" placeholder="Weight">
                  </mat-form-field>
                </div>
              </div>
              <div class="form-group full-width">
                <label>Fitness Goal</label>
                <mat-form-field appearance="outline">
                  <mat-select formControlName="goal">
                    <mat-option value="weight_loss">🔥 Weight Loss</mat-option>
                    <mat-option value="muscle_gain">💪 Muscle Gain</mat-option>
                    <mat-option value="maintenance">⚖️ Maintenance</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
              <button mat-flat-button color="primary" type="submit" [disabled]="loading" class="save-btn">
                <mat-spinner *ngIf="loading" diameter="18"></mat-spinner>
                <span *ngIf="!loading">Save Changes</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Account Info -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><mat-icon>info</mat-icon> Account Information</h3>
          </div>
          <div class="card-body">
            <div class="info-item">
              <span class="info-label">Account Type</span>
              <span class="info-value badge">{{ user?.role | titlecase }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Member Since</span>
              <span class="info-value">{{ user?.created_at | date:'mediumDate' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Current Goal</span>
              <span class="info-value">{{ getGoalLabel() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { max-width: 900px; }
    .settings-grid { display: flex; flex-direction: column; gap: 24px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { margin-bottom: 4px; }
    .form-group.full-width { grid-column: span 2; }
    .form-group label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }
    .save-btn {
      height: 44px;
      padding: 0 32px;
      border-radius: 10px;
      margin-top: 8px;
    }
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .info-item:last-child { border-bottom: none; }
    .info-label { color: #64748b; font-size: 0.9rem; }
    .info-value { font-weight: 600; color: #0f172a; }
    .info-value.badge {
      background: #e0e7ff;
      color: #4f46e5;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
    }
    @media (max-width: 768px) {
      .form-grid { grid-template-columns: 1fr; }
      .form-group.full-width { grid-column: span 1; }
    }
  `]
})
export class SettingsComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      age: [null],
      gender: [''],
      height: [null],
      weight: [null],
      goal: ['maintenance']
    });
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.user = res.user;
        this.profileForm.patchValue(res.user);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
    this.loading = true;
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.user = res.user;
        this.snackBar.open('Settings saved!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to save', 'Close', { duration: 3000 });
      }
    });
  }

  getGoalLabel(): string {
    const labels: Record<string, string> = {
      weight_loss: '🔥 Weight Loss',
      muscle_gain: '💪 Muscle Gain',
      maintenance: '⚖️ Maintenance'
    };
    return labels[this.user?.goal || 'maintenance'] || 'Not Set';
  }
}
