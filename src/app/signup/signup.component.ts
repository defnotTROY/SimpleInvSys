import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Added
import { MatIconModule } from '@angular/material/icon'; // Added for eye icon
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, RouterModule, FormsModule, CommonModule, MatCheckboxModule, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  middleName = '';
  lastName = '';
  phoneNumber = '';

  hidePassword = true;
  hideConfirmPassword = true;
  termsAccepted = false; // Added

  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private supabaseService: SupabaseService) { }

  async onSignup() {
    this.errorMessage = '';
    this.successMessage = '';

    // Basic Client-side Validation
    const missingFields = [];
    if (!this.firstName) missingFields.push('First Name');
    if (!this.lastName) missingFields.push('Last Name');
    if (!this.email) missingFields.push('Email');
    if (!this.password) missingFields.push('Password');
    if (!this.confirmPassword) missingFields.push('Confirm Password');

    if (missingFields.length > 0) {
      this.errorMessage = 'Please fill in: ' + missingFields.join(', ');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.termsAccepted) {
      this.errorMessage = 'You must agree to the Terms and Conditions and Privacy Policy.';
      return;
    }

    // Supabase Registration
    const { data, error } = await this.supabaseService.signUp(this.email, this.password);

    if (error) {
      this.errorMessage = error.message;
    } else {
      // On success, redirect to login with query param
      this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
    }
  }

  togglePassword(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.preventDefault();
  }

  toggleConfirmPassword(event: MouseEvent) {
    this.hideConfirmPassword = !this.hideConfirmPassword;
    event.preventDefault();
  }
}
