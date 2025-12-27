import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="app-header">
      <div class="header-left">
        <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
          <mat-icon>menu</mat-icon>
        </button>
        <div class="breadcrumb">
          <span class="breadcrumb-item">{{ getCurrentPageTitle() }}</span>
        </div>
      </div>
      <div class="header-right">
        <div class="search-box">
          <mat-icon>search</mat-icon>
          <input type="text" placeholder="Search...">
        </div>
        <button class="icon-btn notification-btn">
          <mat-icon>notifications_none</mat-icon>
          <span class="notification-badge">3</span>
        </button>
        <div class="user-dropdown" [matMenuTriggerFor]="userMenu">
          <div class="user-avatar">{{ getInitials() }}</div>
          <mat-icon class="dropdown-arrow">keyboard_arrow_down</mat-icon>
        </div>
        <mat-menu #userMenu="matMenu" xPosition="before">
          <div class="menu-header">
            <div class="menu-avatar">{{ getInitials() }}</div>
            <div class="menu-user-info">
              <span class="menu-user-name">{{ (authService.currentUser$ | async)?.name }}</span>
              <span class="menu-user-email">{{ (authService.currentUser$ | async)?.email }}</span>
            </div>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item routerLink="/profile">
            <mat-icon>person_outline</mat-icon>
            <span>My Profile</span>
          </button>
          <button mat-menu-item routerLink="/settings">
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="logout()" class="logout-menu-item">
            <mat-icon>logout</mat-icon>
            <span>Sign Out</span>
          </button>
        </mat-menu>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" [class.active]="mobileMenuOpen" (click)="toggleMobileMenu()">
      <div class="mobile-menu" (click)="$event.stopPropagation()">
        <div class="mobile-menu-header">
          <div class="logo">
            <div class="logo-icon"><mat-icon>fitness_center</mat-icon></div>
            <span>FitPlanner</span>
          </div>
          <button class="close-btn" (click)="toggleMobileMenu()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        <nav class="mobile-nav">
          <a routerLink="/profile" routerLinkActive="active" (click)="toggleMobileMenu()">
            <mat-icon>space_dashboard</mat-icon> Dashboard
          </a>
          <a routerLink="/workouts" routerLinkActive="active" (click)="toggleMobileMenu()">
            <mat-icon>fitness_center</mat-icon> Workouts
          </a>
          <a routerLink="/meals" routerLinkActive="active" (click)="toggleMobileMenu()">
            <mat-icon>restaurant</mat-icon> Nutrition
          </a>
          <a routerLink="/progress" routerLinkActive="active" (click)="toggleMobileMenu()">
            <mat-icon>analytics</mat-icon> Progress
          </a>
          <a routerLink="/settings" routerLinkActive="active" (click)="toggleMobileMenu()">
            <mat-icon>settings</mat-icon> Settings
          </a>
        </nav>
        <button class="mobile-logout" (click)="logout()">
          <mat-icon>logout</mat-icon> Sign Out
        </button>
      </div>
    </div>
  `,
  styles: [`
    .app-header {
      height: 72px;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-left { display: flex; align-items: center; gap: 16px; }

    .mobile-menu-btn {
      display: none;
      width: 40px;
      height: 40px;
      border: none;
      background: #f1f5f9;
      border-radius: 10px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }

    .mobile-menu-btn mat-icon { color: #64748b; }

    .breadcrumb-item {
      font-size: 1.25rem;
      font-weight: 600;
      color: #0f172a;
    }

    .header-right { display: flex; align-items: center; gap: 16px; }

    .search-box {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #f1f5f9;
      border-radius: 10px;
      padding: 10px 16px;
      width: 240px;
    }

    .search-box mat-icon { color: #94a3b8; font-size: 20px; }

    .search-box input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 0.9rem;
      color: #0f172a;
      width: 100%;
    }

    .search-box input::placeholder { color: #94a3b8; }

    .icon-btn {
      width: 42px;
      height: 42px;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.2s;
    }

    .icon-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
    .icon-btn mat-icon { color: #64748b; }

    .notification-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 18px;
      height: 18px;
      background: #ef4444;
      color: white;
      font-size: 0.65rem;
      font-weight: 600;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-dropdown {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .user-dropdown:hover { background: #f8fafc; border-color: #cbd5e1; }

    .user-avatar {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.85rem;
    }

    .dropdown-arrow { color: #94a3b8; font-size: 20px; }

    .menu-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
    }

    .menu-avatar {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
    }

    .menu-user-info { display: flex; flex-direction: column; }
    .menu-user-name { font-weight: 600; color: #0f172a; }
    .menu-user-email { font-size: 0.8rem; color: #64748b; }

    .logout-menu-item { color: #ef4444 !important; }
    .logout-menu-item mat-icon { color: #ef4444 !important; }

    /* Mobile Menu */
    .mobile-menu-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 2000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .mobile-menu-overlay.active { opacity: 1; visibility: visible; }

    .mobile-menu {
      width: 280px;
      height: 100%;
      background: #1e293b;
      transform: translateX(-100%);
      transition: transform 0.3s;
      display: flex;
      flex-direction: column;
    }

    .mobile-menu-overlay.active .mobile-menu { transform: translateX(0); }

    .mobile-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .mobile-menu-header .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
    }

    .mobile-menu-header .logo-icon {
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn {
      width: 36px;
      height: 36px;
      border: none;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mobile-nav {
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mobile-nav a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 10px;
      color: #94a3b8;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }

    .mobile-nav a:hover, .mobile-nav a.active {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
    }

    .mobile-logout {
      margin: 20px;
      padding: 14px;
      border: 1px solid rgba(239, 68, 68, 0.3);
      background: rgba(239, 68, 68, 0.1);
      border-radius: 10px;
      color: #f87171;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    @media (max-width: 1024px) {
      .search-box { width: 180px; }
    }

    @media (max-width: 768px) {
      .app-header { padding: 0 16px; }
      .mobile-menu-btn { display: flex; }
      .search-box { display: none; }
      .mobile-menu-overlay { display: block; }
    }
  `]
})
export class HeaderComponent {
  mobileMenuOpen = false;

  constructor(public authService: AuthService, private router: Router) {}

  getCurrentPageTitle(): string {
    const path = this.router.url;
    const titles: Record<string, string> = {
      '/profile': 'Dashboard',
      '/workouts': 'Workouts',
      '/meals': 'Nutrition',
      '/progress': 'Progress',
      '/settings': 'Settings'
    };
    return titles[path] || 'Dashboard';
  }

  getInitials(): string {
    const name = this.authService.getCurrentUser()?.name || 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
