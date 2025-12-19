import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
  }

  // Auth endpoints
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData, { headers: this.getHeaders() });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, { headers: this.getHeaders() });
  }

  // Profile endpoints
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, profileData, { headers: this.getHeaders() });
  }

  // Workout endpoints
  getWorkouts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/workouts`, { headers: this.getHeaders() });
  }

  updateWorkoutStatus(day: string, completedStatus: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/workouts/${day}`, completedStatus, { headers: this.getHeaders() });
  }

  // Meal endpoints
  getMeals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/meals`, { headers: this.getHeaders() });
  }

  updateMealStatus(day: string, mealStatus: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/meals/${day}`, mealStatus, { headers: this.getHeaders() });
  }

  // Progress endpoints
  getProgress(): Observable<any> {
    return this.http.get(`${this.apiUrl}/progress`, { headers: this.getHeaders() });
  }
}
