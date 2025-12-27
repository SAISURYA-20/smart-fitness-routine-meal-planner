import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WorkoutRoutineComponent } from './components/workout-routine/workout-routine.component';
import { MealPlannerComponent } from './components/meal-planner/meal-planner.component';
import { ProgressTrackerComponent } from './components/progress-tracker/progress-tracker.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'trainer', 'admin'] } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'trainer', 'admin'] } },
  { path: 'workouts', component: WorkoutRoutineComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'trainer', 'admin'] } },
  { path: 'meals', component: MealPlannerComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'trainer', 'admin'] } },
  { path: 'progress', component: ProgressTrackerComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'trainer', 'admin'] } },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['user', 'trainer', 'admin'] } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
