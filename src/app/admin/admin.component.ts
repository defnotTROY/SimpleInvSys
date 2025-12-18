import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SupabaseService } from '../supabase.service';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';

import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatTooltipModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'actions'];
  inventory: any[] = [];

  constructor(private supabaseService: SupabaseService, private dialog: MatDialog) { }

  async ngOnInit() {
    await this.loadInventory();
  }

  async loadInventory() {
    const { data, error } = await this.supabaseService.getInventory();
    if (error) {
      console.error('Error fetching inventory:', error);
    } else {
      this.inventory = data || [];
    }
  }

  async updateQuantity(item: any, change: number) {
    const newQuantity = (item.quantity || 0) + change;
    if (newQuantity < 0) return; // Prevent negative quantity

    const { error } = await this.supabaseService.updateItem(item.id, { ...item, quantity: newQuantity });
    if (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity: ' + error.message);
    } else {
      await this.loadInventory(); // Refresh list to show updated quantity
    }
  }

  openAddItemDialog(item?: any) {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '400px',
      data: item ? { ...item } : null
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        if (item) {
          const { error } = await this.supabaseService.updateItem(item.id, result);
          if (error) {
            console.error('Error updating item:', error);
            alert('Failed to update item: ' + error.message);
          }
        } else {
          const { error } = await this.supabaseService.addItem(result);
          if (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item: ' + error.message);
          }
        }
        await this.loadInventory(); // Refresh list
      }
    });
  }


  async deleteItem(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Delete Item', message: 'Are you sure you want to delete this item?' }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const { error } = await this.supabaseService.deleteItem(id);
        if (error) {
          console.error('Error deleting item:', error);
          alert('Failed to delete item: ' + error.message);
        } else {
          await this.loadInventory(); // Refresh list
        }
      }
    });
  }
}
