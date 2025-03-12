import {Component, HostListener} from '@angular/core';
import {KayakBookingService} from '../services/kayak-booking.service';
import {CommonModule} from '@angular/common';
import {TableContainerComponent} from '../table-container/table-container.component';
import {FiltersComponent} from '../filters/filters.component';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

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
  loading: boolean = false;
  page: number = 0;
  size: number = 10;
  hasMoreData: boolean = true;

  private activeFilters: any = {};

  constructor(private service: KayakBookingService, private router: Router) {
  }


  onFiltersChanged(filters: any): void {
    this.page = 0;
    this.activeFilters = filters;
    this.tableData = [];
    this.hasMoreData = true;

    this.loadPageData();
  }

  loadPageData(): void {
    if (this.loading || !this.hasMoreData) {
      return;
    }

    this.loading = true;

    this.service.getTrips(this.activeFilters, this.page, this.size).subscribe({
      next: (response: any) => {
        const parsedResponse = JSON.parse(response);
        const newData = parsedResponse.data || [];

        this.tableData = [...this.tableData, ...newData];
        this.hasMoreData = newData.length === this.size;
        this.page += 1;
        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd podczas pobierania danych:', err);
        this.loading = false;
      },
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;

    if (scrollPosition >= pageHeight - 100 && !this.loading) {
      this.loadPageData();
    }
  }

  onRowClicked(row: any): void {
    this.router.navigate(['/transaction', row.orderId], {
      state: {data: row}
    });
  }
}
