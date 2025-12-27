import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-page">
      <div class="auth-left">
        <div class="brand">
          <div class="brand-icon">
            <mat-icon>fitness_center</mat-icon>
          </div>
          <h1>FitPlanner</h1>
        </div>
        <div class="hero-content">
          <h2>Transform Your Body,<br>Transform Your Life</h2>
          <p>Get personalized workout routines and meal plans tailored to your fitness goals.</p>
          <div class="features">
            <div class="feature">
              <mat-icon>check_circle</mat-icon>
              <span>Custom workout plans</span>
            </div>
            <div class="feature">
              <mat-icon>check_circle</mat-icon>
              <span>Personalized nutrition</span>
            </div>
            <div class="feature">
              <mat-icon>check_circle</mat-icon>
              <span>Progress tracking</span>
            </div>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-card">
          <div class="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your fitness journey</p>
          </div>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Email Address</label>
              <mat-form-field appearance="outline">
                <input matInput formControlName="email" type="email" placeholder="Enter your email">
                <mat-icon matPrefix>mail_outline</mat-icon>
                <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
                <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
              </mat-form-field>
            </div>
            <div class="form-group">
              <label>Password</label>
              <mat-form-field appearance="outline">
                <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" placeholder="Enter your password">
                <mat-icon matPrefix>lock_outline</mat-icon>
                <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error>Password is required</mat-error>
              </mat-form-field>
            </div>
            <button mat-flat-button color="primary" type="submit" class="submit-btn" [disabled]="loading">
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
              <span *ngIf="!loading">Sign In</span>
            </button>
          </form>
          <div class="auth-footer">
            <p>Don't have an account? <a routerLink="/register">Create Account</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .auth-left {
      background: linear-gradient(135deg, #5e35b1 0%, #311b92 100%);
      padding: 48px;
      display: flex;
      flex-direction: column;
      color: white;
      position: relative;
      overflow: hidden;
    }
    .auth-left::before {
      content: '';
      position: absolute;
      top: -20%;
      right: -20%;
      width: 60%;
      height: 60%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    }
    .auth-left::after {
      content: '';
      position: absolute;
      bottom: -10%;
      left: -10%;
      width: 40%;
      height: 40%;
      background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
      position: relative;
      z-index: 1;
    }
    .brand-icon {
      width: 50px;
      height: 50px;
      background: rgba(255,255,255,0.2);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand-icon mat-icon { font-size: 28px; }
    .brand h1 { font-size: 1.5rem; font-weight: 700; }
    .hero-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      z-index: 1;
    }
    .hero-content h2 {
      font-size: 2.75rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 20px;
    }
    .hero-content p {
      font-size: 1.1rem;
      opacity: 0.9;
      max-width: 400px;
      margin-bottom: 32px;
    }
    .features { display: flex; flex-direction: column; gap: 14px; }
    .feature {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1rem;
    }
    .feature mat-icon { color: #00bfa5; }
    .auth-right {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
      background: #f8fafc;
    }
    .auth-card {
      width: 100%;
      max-width: 420px;
      background: white;
      border-radius: 24px;
      padding: 48px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    }
    .auth-header { margin-bottom: 32px; }
    .auth-header h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 8px;
    }
    .auth-header p { color: #64748b; }
    .form-group { margin-bottom: 20px; }
    .form-group label {
      display: block;
      font-weight: 500;
      color: #334155;
      margin-bottom: 8px;
      font-size: 0.9rem;
    }
    mat-form-field { width: 100%; }
    .submit-btn {
      width: 100%;
      height: 52px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 12px;
      margin-top: 8px;
    }
    .auth-footer {
      text-align: center;
      margin-top: 28px;
      color: #64748b;
    }
    .auth-footer a {
      color: #5e35b1;
      text-decoration: none;
      font-weight: 600;
    }
    @media (max-width: 900px) {
      .auth-page { grid-template-columns: 1fr; }
      .auth-left { display: none; }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.snackBar.open('Welcome back!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Login failed', 'Close', { duration: 3000 });
      }
    });
  }
}
