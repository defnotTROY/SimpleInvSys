import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Added ActivatedRoute
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = ''; // Added

  constructor(private router: Router, private supabaseService: SupabaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Check if redirected from successful signup
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.successMessage = 'Sign up successful! You can log in now.';
      }
    });
  }

  async onLogin() {
    this.errorMessage = '';
    this.successMessage = ''; // Clear success message on login attempt
    const { data, error } = await this.supabaseService.signIn(this.email, this.password);

    if (error) {
      this.errorMessage = error.message;
    } else {
      console.log('Login successful', data);
      this.router.navigate(['/nav/dashboard']);
    }
  }
}
