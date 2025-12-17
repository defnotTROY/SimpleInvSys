import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'actions'];
  inventory = [
    { id: 1, name: 'Laptop', quantity: 15, price: 1200 },
    { id: 2, name: 'Mouse', quantity: 50, price: 25 },
    { id: 3, name: 'Keyboard', quantity: 30, price: 45 },
    { id: 4, name: 'Monitor', quantity: 20, price: 300 },
    { id: 5, name: 'Headset', quantity: 25, price: 80 }
  ];
}
