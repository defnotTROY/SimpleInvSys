import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Added
import { SupabaseService } from '../supabase.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule, MatIconModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'status']; // Added status
  inventory: any[] = [];

  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit() {
    await this.loadInventory();
  }

  async loadInventory() {
    const { data, error } = await this.supabaseService.getInventory();
    if (error) {
      console.error('Error fetching inventory:', error);
    } else {
      this.inventory = (data || []).map((item: any) => ({
        ...item,
        status: this.getStatus(item.quantity)
      }));
    }
  }

  getStatus(quantity: number): string {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
  }

  get totalItems() {
    return this.inventory.length;
  }

  get outOfStockItems() {
    return this.inventory.filter(item => (Number(item.quantity) || 0) === 0).length;
  }

  get totalValue() {
    return this.inventory.reduce((acc, item) => acc + (Number(item.price) * (Number(item.quantity) || 0)), 0);
  }

  get lowStockItems() {
    return this.inventory.filter(item => {
      const q = Number(item.quantity) || 0;
      return q < 10 && q > 0;
    }).length;
  }
}
