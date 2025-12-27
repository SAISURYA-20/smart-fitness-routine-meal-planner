import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <!-- Public Navbar -->
    <mat-toolbar class="navbar public" *ngIf="!authService.isLoggedIn()">
      <div class="navbar-content">
        <a routerLink="/" class="logo">
          <div class="logo-icon"><mat-icon>fitness_center</mat-icon></div>
          <span class="logo-text">FitPlanner</span>
        </a>
        <div class="nav-actions">
          <a mat-button routerLink="/login" class="login-btn">Sign In</a>
          <a mat-flat-button color="primary" routerLink="/register" class="register-btn">Get Started</a>
        </div>
      </div>
    </mat-toolbar>

    <!-- Private Navbar -->
    <header class="app-header" *ngIf="authService.isLoggedIn()">
      <div class="header-content">
        <a routerLink="/profile" class="logo">
          <div class="logo-icon"><mat-icon>fitness_center</mat-icon></div>
          <span class="logo-text">FitPlanner</span>
        </a>
        <nav class="nav-menu">
          <a routerLink="/profile" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            <mat-icon>space_dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a routerLink="/workouts" routerLinkActive="active" class="nav-item">
            <mat-icon>fitness_center</mat-icon>
            <span>Workouts</span>
          </a>
          <a routerLink="/meals" routerLinkActive="active" class="nav-item">
            <mat-icon>restaurant</mat-icon>
            <span>Nutrition</span>
          </a>
          <a routerLink="/progress" routerLinkActive="active" class="nav-item">
            <mat-icon>analytics</mat-icon>
            <span>Progress</span>
          </a>
        </nav>
        <div class="header-actions">
          <button class="notification-btn">
            <mat-icon>notifications_none</mat-icon>
          </button>
          <div class="user-dropdown" [matMenuTriggerFor]="userMenu">
            <div class="user-avatar">
              {{ getInitials() }}
            </div>
            <div class="user-info">
              <span class="user-name">{{ (authService.currentUser$ | async)?.name || 'User' }}</span>
              <span class="user-role">{{ getRoleLabel() }}</span>
            </div>
            <mat-icon class="chevron">expand_more</mat-icon>
          </div>
          <mat-menu #userMenu="matMenu" xPosition="before">
            <button mat-menu-item routerLink="/profile">
              <mat-icon>person_outline</mat-icon>
              <span>My Profile</span>
            </button>
            <button mat-menu-item routerLink="/progress">
              <mat-icon>insights</mat-icon>
              <span>My Progress</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()" class="logout-item">
              <mat-icon>logout</mat-icon>
              <span>Sign Out</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </header>
  `,
  styles: [`
    /* Public Navbar */
    .navbar.public {
      background: transparent;
      box-shadow: none;
      position: absolute;
      width: 100%;
      padding: 0 48px;
      height: 80px;
      z-index: 100;
    }
    .navbar.public .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }
    .navbar.public .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .navbar.public .logo-icon {
      width: 44px; height: 44px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      color: white;
    }
    .navbar.public .logo-text { font-size: 1.25rem; font-weight: 700; color: white; }
    .navbar.public .nav-actions { display: flex; gap: 12px; }
    .navbar.public .login-btn { color: white; font-weight: 500; }
    .navbar.public .register-btn { border-radius: 10px; padding: 0 24px; font-weight: 600; }

    /* Private Header */
    .app-header {
      background: white;
      border-bottom: 1px solid #e2e8f0;
      padding: 0 32px;
      height: 72px;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .header-content {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      gap: 48px;
    }
    .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .logo-icon {
      width: 40px; height: 40px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      color: white;
    }
    .logo-icon mat-icon { font-size: 22px; }
    .logo-text { font-size: 1.2rem; font-weight: 700; color: #0f172a; }

    .nav-menu { display: flex; gap: 4px; flex: 1; }
    .nav-item {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 16px;
      border-radius: 8px;
      text-decoration: none;
      color: #64748b;
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.15s ease;
    }
    .nav-item:hover { background: #f1f5f9; color: #0f172a; }
    .nav-item.active { background: #eef2ff; color: #6366f1; }
    .nav-item mat-icon { font-size: 20px; width: 20px; height: 20px; }

    .header-actions { display: flex; align-items: center; gap: 16px; }
    .notification-btn {
      width: 40px; height: 40px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: white;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .notification-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
    .notification-btn mat-icon { color: #64748b; font-size: 22px; }

    .user-dropdown {
      display: flex; align-items: center; gap: 12px;
      padding: 6px 12px 6px 6px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.15s;
    }
    .user-dropdown:hover { background: #f8fafc; border-color: #cbd5e1; }
    .user-avatar {
      width: 36px; height: 36px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.85rem;
    }
    .user-info { display: flex; flex-direction: column; }
    .user-name { font-size: 0.875rem; font-weight: 600; color: #0f172a; line-height: 1.2; }
    .user-role { font-size: 0.75rem; color: #64748b; }
    .chevron { color: #94a3b8; font-size: 20px; width: 20px; height: 20px; }

    .logout-item { color: #ef4444; }
    .logout-item mat-icon { color: #ef4444; }

    @media (max-width: 1024px) {
      .nav-item span { display: none; }
      .user-info { display: none; }
      .header-content { gap: 24px; }
    }
    @media (max-width: 768px) {
      .app-header { padding: 0 16px; }
      .logo-text { display: none; }
    }
  `]
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getInitials(): string {
    const name = this.authService.getCurrentUser()?.name || 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getRoleLabel(): string {
    const role = this.authService.getCurrentUser()?.role || 'user';
    return role.charAt(0).toUpperCase() + role.slice(1);
  }
}
