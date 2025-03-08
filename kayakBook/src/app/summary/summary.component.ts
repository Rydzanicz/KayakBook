import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { KayakBookingService } from '../services/kayak-booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  traceId: string = '';
  selectedHour: string = '';
  selectedKayaks: { type: string; count: number }[] = [];
  kayaks: { [key: string]: { name: string; price: number } } = {};
  buyerName: string = '';
  buyerAddressEmail: string = '';
  buyerPhone: string = '';

  constructor(private router: Router, private kayakBookingService: KayakBookingService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      traceId?: string;
      selectedHour?: string;
      selectedKayaks?: { type: string; count: number }[];
      kayaks?: { [key: string]: { name: string; price: number } };
    };

    this.traceId = state?.traceId ?? '';
    this.selectedHour = state?.selectedHour ?? '';
    this.selectedKayaks = state?.selectedKayaks ?? [];
    this.kayaks = state?.kayaks ?? {};
  }

  calculateTotalPrice(): number {
    return this.selectedKayaks.reduce((total, kayak) => {
      const item = this.kayaks[kayak.type];
      return total + (item?.price || 0) * kayak.count;
    }, 0);
  }

  saveOrder(): void {
    if (!this.buyerName || !this.buyerAddressEmail || !this.buyerPhone) {
      alert('Proszę uzupełnić wszystkie wymagane pola.');
      return;
    }

    const orderData = {
      buyerName: this.buyerName,
      buyerAddressEmail: this.buyerAddressEmail,
      buyerPhone: this.buyerPhone,
      orderDate: new Date().toISOString(),
      kayakOne: this.selectedKayaks.find((kayak) => kayak.type === 'single')?.count ?? 0,
      kayakTwo: this.selectedKayaks.find((kayak) => kayak.type === 'double')?.count ?? 0,
      kayakOne_Two: this.selectedKayaks.find((kayak) => kayak.type === 'family')?.count ?? 0,
    };

    this.kayakBookingService.sendBuyerData(orderData).subscribe({
      next: response => {
        console.log('Zamówienie zapisane pomyślnie:', response);
        alert('Zamówienie zostało zapisane!');
      },
      error: error => {
        console.error('Błąd przy zapisywaniu zamówienia:', error);
        alert('Wystąpił błąd przy zapisywaniu zamówienia.');
      }
    });
  }
}
