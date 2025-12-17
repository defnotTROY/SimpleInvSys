import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
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
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private supabaseService: SupabaseService) { }

  async onLogin() {
    this.errorMessage = '';
    const { data, error } = await this.supabaseService.signIn(this.email, this.password);

    if (error) {
      this.errorMessage = error.message;
    } else {
      console.log('Login successful', data);
      this.router.navigate(['/nav/dashboard']);
    }
  }
}
