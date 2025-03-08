import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { KayakBookingService } from '../services/kayak-booking.service'; // Upewnij się, że ścieżka jest poprawna

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  traceId: string = '';
  selectedHour: string = '';
  selectedKayaks: { type: string; count: number }[] = [];
  kayaks: { [key: string]: { name: string; price: number } } = {};

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
    const orderData = {
      buyerName: 'Example', // Przykładowa nazwa użytkownika (możesz dostosować)
      buyerAddressEmail: 'example@example.com', // Przykładowy email (możesz dodać pola do formularza)
      buyerPhone: '123456789', // Przykładowy numer telefonu
      orderDate: new Date().toISOString(), // Aktualna data zamówienia
      kayakOne: this.selectedKayaks.find(k => k.type === 'kayakOne')?.count || 0,
      kayakTwo: this.selectedKayaks.find(k => k.type === 'kayakTwo')?.count || 0,
      kayakOne_Two: this.selectedKayaks.find(k => k.type === 'kayakOne_Two')?.count || 0
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
