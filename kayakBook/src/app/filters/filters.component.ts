import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  imports: [FormsModule, CommonModule],
})
export class FiltersComponent implements OnInit {
  startDate: string | null = null;
  endDate: string | null = null;
  isFuture: boolean = true;

  @Output() filtersChanged = new EventEmitter<any>();

  ngOnInit(): void {
  }

  private formatDate(date: string | null): string | null {
    if (!date) return null;
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
  }

  applyFilters(): void {
    const filters: any = {
      isFuture: this.isFuture,
      ...(this.startDate ? {startDate: this.formatDate(this.startDate)} : {}),
      ...(this.endDate ? {endDate: this.formatDate(this.endDate)} : {}),
    };

    if (this.startDate && this.endDate && new Date(this.startDate) > new Date(this.endDate)) {
      console.error('Data końcowa musi być późniejsza lub równa dacie początkowej!');
      return;
    }

    console.log('Zastosowane filtry:', filters);
    this.filtersChanged.emit(filters);
  }
}
