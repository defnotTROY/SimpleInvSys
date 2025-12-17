import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  inventory = [
    { id: 1, name: 'Laptop', quantity: 15, price: 1200 },
    { id: 2, name: 'Mouse', quantity: 50, price: 25 },
    { id: 3, name: 'Keyboard', quantity: 30, price: 45 },
    { id: 4, name: 'Monitor', quantity: 20, price: 300 },
    { id: 5, name: 'Headset', quantity: 25, price: 80 }
  ];
}
