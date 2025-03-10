import {Component, Input} from '@angular/core';
import {FutureTrip} from '../models/future-trip.model';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
  imports: [
    DatePipe,
    CommonModule
  ]
})
export class TableContainerComponent {
  @Input() data: FutureTrip[] = [];

  sortState: { column: string; direction: 'ASC' | 'DESC' } = {column: '', direction: 'ASC'};

  sortData(column: keyof FutureTrip): void {
    if (!this.data || this.data.length === 0) return;

    if (this.sortState.column !== column) {
      this.sortState.direction = 'ASC';
    }

    this.data.sort((a, b) => {
      const valueA = column === 'orderDate' ? new Date(a[column]).getTime() : a[column];
      const valueB = column === 'orderDate' ? new Date(b[column]).getTime() : b[column];

      return this.sortState.direction === 'ASC'
        ? valueA > valueB ? 1 : -1
        : valueA < valueB ? 1 : -1;
    });

    this.sortState = {
      column,
      direction: this.sortState.direction === 'ASC' ? 'DESC' : 'ASC',
    };
  }
}
