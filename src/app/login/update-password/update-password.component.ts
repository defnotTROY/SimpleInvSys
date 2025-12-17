import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, RouterModule, FormsModule, CommonModule, MatIconModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent implements OnInit {
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  hidePassword = true;
  hideConfirmPassword = true;
  private session: any = null;

  constructor(private router: Router, private supabaseService: SupabaseService) { }

  async ngOnInit() {
    // Check for existing session or listen for recovery
    const { data } = await this.supabaseService.getSession();
    this.session = data.session;

    this.supabaseService.authChanges.data.subscription.unsubscribe(); // Just to access the method, cleaner way would be exposing the observable directly but this works for simple check

    // We can also retry fetching session after a short delay if it's null, as the hash processing might be happening
    if (!this.session) {
      // Wait a moment for Supabase to process the hash
      setTimeout(async () => {
        const { data } = await this.supabaseService.getSession();
        this.session = data.session;
        console.log('Session check retry:', this.session);
      }, 1000);
    }
  }

  async onUpdate() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Check session again
    if (!this.session) {
      const { data } = await this.supabaseService.getSession();
      this.session = data.session;
    }

    if (!this.session) {
      this.errorMessage = 'Session expired or invalid. Please request a new password reset link.';
      return;
    }

    const { error } = await this.supabaseService.updatePassword(this.password);

    if (error) {
      this.errorMessage = error.message;
    } else {
      this.successMessage = 'Password updated successfully! Redirecting to login...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
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
