import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { ProfileComponent } from './features/profile/profile';
import { WorkoutsComponent } from './features/workouts/workouts';
import { MealsComponent } from './features/meals/meals';
import { ProgressComponent } from './features/progress/progress';
import { AuthGuard } from './core/auth.guard';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  { 
    path: 'workouts', 
    component: WorkoutsComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  { 
    path: 'meals', 
    component: MealsComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  { 
    path: 'progress', 
    component: ProgressComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];
