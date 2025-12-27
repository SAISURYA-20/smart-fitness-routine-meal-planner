import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DayPlan, DayProgress, ProgressSummary } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlanService {
  constructor(private http: HttpClient) {}

  generatePlan(): Observable<{ message: string; plan: DayPlan[] }> {
    return this.http.post<{ message: string; plan: DayPlan[] }>(`${environment.apiUrl}/plans/generate`, {});
  }

  getWeeklyPlan(): Observable<{ plan: DayPlan[]; message?: string }> {
    return this.http.get<{ plan: DayPlan[]; message?: string }>(`${environment.apiUrl}/plans/weekly`);
  }

  getDayPlan(day: string): Observable<{ plan: DayPlan }> {
    return this.http.get<{ plan: DayPlan }>(`${environment.apiUrl}/plans/day/${day}`);
  }

  markExerciseComplete(day: string, exerciseId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/plans/exercise/complete`, { day, exerciseId });
  }

  markMealConsumed(day: string, mealId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/plans/meal/consume`, { day, mealId });
  }

  getProgress(): Observable<{ progress: DayProgress[]; summary: ProgressSummary }> {
    return this.http.get<{ progress: DayProgress[]; summary: ProgressSummary }>(`${environment.apiUrl}/plans/progress`);
  }
}
