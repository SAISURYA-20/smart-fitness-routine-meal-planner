import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Api } from '../../core/api';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  loadingProfile = true;

  constructor(
    private fb: FormBuilder,
    private api: Api,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      goal: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loadingProfile = true;
    this.api.getProfile().subscribe({
      next: (response: any) => {
        this.loadingProfile = false;
        if (response.user) {
          this.profileForm.patchValue({
            name: response.user.name,
            age: response.user.age,
            gender: response.user.gender,
            height: response.user.height,
            weight: response.user.weight,
            goal: response.user.goal
          });
        }
      },
      error: (error) => {
        this.loadingProfile = false;
        this.snackBar.open(
          error.error?.message || 'Failed to load profile',
          'Close',
          { duration: 5000 }
        );
      }
    });
  }

  onSave() {
    if (this.profileForm.valid) {
      this.loading = true;
      this.api.updateProfile(this.profileForm.value).subscribe({
        next: (response: any) => {
          this.loading = false;
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000
          });
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open(
            error.error?.message || 'Failed to update profile',
            'Close',
            { duration: 5000 }
          );
        }
      });
    }
  }
}
