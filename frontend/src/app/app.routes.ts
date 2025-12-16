import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { ProfileComponent } from './features/profile/profile';
import { WorkoutsComponent } from './features/workouts/workouts';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];
