import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
  imports: [FormsModule, CommonModule],
})
export class TableContainerComponent {
  @Input() data: any[] = [];

  sortState: { column: string, direction: 'ASC' | 'DESC' } = {column: '', direction: 'ASC'};

  sortData(column: 'orderId' | 'name' | 'email' | 'phone' | 'orderDate' | 'kayakOne' | 'kayakTwo' | 'kayakOne_Two' | 'emailSend'): void {
    if (!this.data || this.data.length === 0) return;

    if (this.sortState.column !== column) {
      this.sortState.direction = 'ASC';
    }

    this.data.sort((a, b) => {
      const valueA = typeof a[column] === 'string' ? a[column].toString() : a[column];
      const valueB = typeof b[column] === 'string' ? b[column].toString() : b[column];

      if (column === 'orderDate') {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return this.sortState.direction === 'ASC' ? dateA - dateB : dateB - dateA;
      }

      return this.sortState.direction === 'ASC'
        ? valueA > valueB
          ? 1
          : -1
        : valueA < valueB
          ? 1
          : -1;
    });

    this.sortState = {
      column,
      direction: this.sortState.direction === 'ASC' ? 'DESC' : 'ASC',
    };
  }
}
