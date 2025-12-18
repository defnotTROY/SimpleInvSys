import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface DialogData {
  id?: number; // Optional ID for editing
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.scss'
})
export class AddItemDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData // Data passed from parent
  ) {
    // Initialize with empty/default if null
    if (!this.data) {
      this.data = { name: '', price: 0, quantity: 0 };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isValid(): boolean {
    return this.data.name?.trim().length > 0 && this.data.price >= 0 && this.data.quantity >= 0;
  }
}
