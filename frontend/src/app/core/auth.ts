import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Api } from './api';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  role: 'user' | 'trainer' | 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private router: Router, private api: Api) {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.api.login({ email, password }).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          const user: User = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role || 'user'
          };
          this.setCurrentUser(user);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  register(userData: any): Observable<boolean> {
    return this.api.register(userData).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          const user: User = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role || 'user'
          };
          this.setCurrentUser(user);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: 'user' | 'trainer' | 'admin'): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role || user?.role === 'admin';
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
