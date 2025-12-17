import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-forgot-password-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './forgot-password-dialog.component.html',
  styleUrl: './forgot-password-dialog.component.scss'
})
export class ForgotPasswordDialogComponent {
  email = '';
  isLoading = false;
  message = '';
  isError = false;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private supabaseService: SupabaseService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSend() {
    if (!this.email) return;

    this.isLoading = true;
    this.message = '';
    this.isError = false;

    const { error } = await this.supabaseService.resetPasswordForEmail(this.email);
    this.isLoading = false;

    if (error) {
      this.message = 'Error: ' + error.message;
      this.isError = true;
    } else {
      this.message = 'Password reset link has been sent to your email.';
      // Optionally close after a delay or let user close
    }
  }
}
