import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isAuthenticated()) {
      // Check if route requires specific role
      const requiredRole = route.data['role'] as 'user' | 'trainer' | 'admin' | undefined;
      
      if (requiredRole && !this.auth.hasRole(requiredRole)) {
        // User doesn't have required role, redirect to unauthorized or login
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      
      return true;
    }

    // Not authenticated, redirect to login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

