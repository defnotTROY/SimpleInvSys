import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email = '';
  password = '';
  name = '';
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private supabaseService: SupabaseService) { }

  async onSignup() {
    this.errorMessage = '';
    this.successMessage = '';

    // Note: 'name' is unused in basic supabase auth start
    const { data, error } = await this.supabaseService.signUp(this.email, this.password);

    if (error) {
      this.errorMessage = error.message;
    } else {
      this.successMessage = 'Registration successful! Please check your email for confirmation.';
    }
  }
}
