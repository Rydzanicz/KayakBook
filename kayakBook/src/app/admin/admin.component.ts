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
    CommonModule
  ]
})
export class AdminComponent {
  futureTrips: FutureTrip[] = [];
  filteredTrips: FutureTrip[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private kayakBookingService: KayakBookingService) {
  }

  fetchFutureTrips(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.kayakBookingService.getFutureTrips().subscribe({
      next: (trips: FutureTrip[]) => {
        this.futureTrips = trips;
        this.filteredTrips = trips;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Błąd podczas pobierania danych:', error);
        this.errorMessage = 'Nie udało się załadować listy przyszłych wycieczek.';
        this.isLoading = false;
      },
    });
  }

  applyFilters(filters: any): void {
    this.filteredTrips = this.futureTrips.filter((trip) => {
      const matchStartDate =
        !filters.startDate || new Date(trip.orderDate) >= new Date(filters.startDate);
      const matchEndDate =
        !filters.endDate || new Date(trip.orderDate) <= new Date(filters.endDate);
      const matchPastRegistration =
        !filters.isPastRegistration || new Date(trip.orderDate) < new Date();

      return matchStartDate && matchEndDate && matchPastRegistration;
    });
  }
}
