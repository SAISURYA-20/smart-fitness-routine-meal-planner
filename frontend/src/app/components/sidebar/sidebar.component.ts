import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <a routerLink="/dashboard" class="logo">
          <div class="logo-icon">
            <mat-icon>fitness_center</mat-icon>
          </div>
          <span class="logo-text">FitPlanner</span>
        </a>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <span class="nav-label">OVERVIEW</span>
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <mat-icon class="nav-icon">dashboard</mat-icon>
            <span class="nav-text">Dashboard</span>
          </a>
        </div>

        <div class="nav-section">
          <span class="nav-label">FITNESS</span>
          <a routerLink="/workouts" routerLinkActive="active" class="nav-item">
            <mat-icon class="nav-icon">fitness_center</mat-icon>
            <span class="nav-text">Workouts</span>
          </a>
          <a routerLink="/meals" routerLinkActive="active" class="nav-item">
            <mat-icon class="nav-icon">restaurant</mat-icon>
            <span class="nav-text">Nutrition</span>
          </a>
          <a routerLink="/progress" routerLinkActive="active" class="nav-item">
            <mat-icon class="nav-icon">insights</mat-icon>
            <span class="nav-text">Progress</span>
          </a>
        </div>

        <div class="nav-section">
          <span class="nav-label">ACCOUNT</span>
          <a routerLink="/profile" routerLinkActive="active" class="nav-item">
            <mat-icon class="nav-icon">person</mat-icon>
            <span class="nav-text">Profile</span>
          </a>
          <a routerLink="/settings" routerLinkActive="active" class="nav-item">
            <mat-icon class="nav-icon">settings</mat-icon>
            <span class="nav-text">Settings</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-card">
          <div class="user-avatar">{{ getInitials() }}</div>
          <div class="user-info">
            <span class="user-name">{{ (authService.currentUser$ | async)?.name || 'User' }}</span>
            <span class="user-role">{{ getGoalLabel() }}</span>
          </div>
        </div>
        <button class="logout-btn" (click)="logout()">
          <mat-icon>logout</mat-icon>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: #fafbfc;
      border-right: 1px solid #eaedf2;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      z-index: 1000;
    }

    .sidebar-header {
      padding: 20px 18px;
      border-bottom: 1px solid #eaedf2;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      background: #2563eb;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .logo-icon mat-icon { font-size: 20px; width: 20px; height: 20px; }

    .logo-text {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1e293b;
    }

    .sidebar-nav {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
    }

    .nav-section {
      margin-bottom: 20px;
    }

    .nav-label {
      display: block;
      font-size: 0.65rem;
      font-weight: 600;
      color: #94a3b8;
      letter-spacing: 0.5px;
      padding: 8px 10px 6px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 6px;
      text-decoration: none;
      color: #64748b;
      margin-bottom: 2px;
      transition: all 0.15s ease;
      font-weight: 500;
      font-size: 0.875rem;
    }

    .nav-item:hover {
      background: #f1f5f9;
      color: #334155;
    }

    .nav-item.active {
      background: #2563eb;
      color: white;
    }

    .nav-item.active .nav-icon {
      color: white;
    }

    .nav-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #94a3b8;
    }

    .nav-item:hover .nav-icon {
      color: #64748b;
    }

    .nav-text {
      font-size: 0.875rem;
    }

    .sidebar-footer {
      padding: 12px;
      border-top: 1px solid #eaedf2;
      background: #f8fafc;
    }

    .user-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    .user-avatar {
      width: 34px;
      height: 34px;
      background: #2563eb;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.8rem;
    }

    .user-info {
      flex: 1;
      overflow: hidden;
    }

    .user-name {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: #1e293b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      display: block;
      font-size: 0.7rem;
      color: #64748b;
    }

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 9px;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 6px;
      color: #64748b;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    .logout-btn:hover {
      background: #fef2f2;
      border-color: #fecaca;
      color: #dc2626;
    }

    .logout-btn mat-icon { font-size: 16px; width: 16px; height: 16px; }

    @media (max-width: 1024px) {
      .sidebar { width: 68px; }
      .logo-text, .nav-text, .nav-label, .user-info, .logout-btn span { display: none; }
      .sidebar-header { padding: 14px 10px; }
      .logo { justify-content: center; }
      .nav-item { justify-content: center; padding: 10px; }
      .user-card { justify-content: center; padding: 8px; }
      .logout-btn { padding: 10px; }
    }

    @media (max-width: 768px) {
      .sidebar { display: none; }
    }
  `]
})
export class SidebarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  getInitials(): string {
    const name = this.authService.getCurrentUser()?.name || 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getGoalLabel(): string {
    const goal = this.authService.getCurrentUser()?.goal || 'maintenance';
    const labels: Record<string, string> = {
      weight_loss: 'Weight Loss',
      muscle_gain: 'Muscle Gain',
      maintenance: 'Maintenance'
    };
    return labels[goal] || 'User';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
