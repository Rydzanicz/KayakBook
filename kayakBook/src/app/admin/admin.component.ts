import {Component} from '@angular/core';
import {KayakBookingService} from '../services/kayak-booking.service';
import {FutureTrip} from '../models/future-trip.model';
import {FiltersComponent} from '../filters/filters.component';
import {TableContainerComponent} from '../table-container/table-container.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
    FiltersComponent,
    TableContainerComponent,
    CommonModule,
    HttpClientModule,
  ],
})
export class AdminComponent {
  tableData: any[] = [];
  loading = false;
  page = 0;
  size = 10;
  hasMoreData = true;

  private activeFilters: Record<string, any> = {};
  private readonly SCROLL_THRESHOLD = 100;

  constructor(private service: KayakBookingService) {}

  onFiltersChanged(filters: Record<string, any>): void {
    this.resetPagination();
    this.activeFilters = filters;
    this.loadPageData();
  }

  private fetchTrips(): void {
    this.service.getFutureTrips(this.activeFilters, this.page, this.size).subscribe({
      next: (backendResponse: string) => {
        const responseJSON = this.parseJsonResponse(backendResponse);
        const newData = responseJSON.data || [];
        this.updateTableData(newData);
      },
      error: (err) => this.handleError(err),
    });
  }

  loadPageData(): void {
    if (this.loading || !this.hasMoreData) return;
    this.loading = true;
    this.fetchTrips();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;

    if (scrollPosition >= pageHeight - this.SCROLL_THRESHOLD && !this.loading) {
      this.loadPageData();
    }
  }

  private resetPagination(): void {
    this.page = 0;
    this.tableData = [];
    this.hasMoreData = true;
  }

  private updateTableData(newData: any[]): void {
    this.tableData = [...this.tableData, ...newData];
    this.hasMoreData = newData.length === this.size;
    this.page += 1;
    this.loading = false;
  }

  private handleError(error: any): void {
    console.error('Błąd podczas pobierania danych:', error);
    this.loading = false;
  }

  private parseJsonResponse(response: string): any {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Błąd parsowania JSON:', error);
      return { data: [] };
    }
  }
}
