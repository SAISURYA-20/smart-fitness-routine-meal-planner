import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { ProfileComponent } from './features/profile/profile';
import { WorkoutsComponent } from './features/workouts/workouts';
import { MealsComponent } from './features/meals/meals';
import { ProgressComponent } from './features/progress/progress';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'meals', component: MealsComponent },
  { path: 'progress', component: ProgressComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];
