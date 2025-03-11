import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {KayakBookingService} from '../../services/kayak-booking.service'; // Import serwisu
import {FutureTrip} from "../../models/future-trip.model";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class TransactionDetailsComponent implements OnInit {
  futureTrip: FutureTrip = {
    orderId: 0,
    name: '',
    email: '',
    phone: '',
    orderDate: '',
    kayakOne: 0,
    kayakTwo: 0,
    kayakOne_Two: 0,
    emailSend: false,
  };

  constructor(
    private route: ActivatedRoute,
    private service: KayakBookingService // Serwis
  ) {
  }

  ngOnInit(): void {
    const navigation = history.state;

    if (navigation.data) {
      this.futureTrip = navigation.data;
    } else {
      this.route.params.subscribe((params) => {
        const id = +params['id'];
      });
    }
  }

  updateTransaction(): void {
    const updatedData = {
      orderId: this.futureTrip.orderId,
      kayakOne: this.futureTrip.kayakOne,
      kayakTwo: this.futureTrip.kayakTwo,
      kayakOne_Two: this.futureTrip.kayakOne_Two,
      emailSend: this.futureTrip.emailSend,
    };

    this.service.updateTransactionDetails(updatedData).subscribe({
      next: (response) => {
        alert('Dane zostały zapisane pomyślnie!');
        window.location.href = '/admin';
      },
      error: (err) => {
        console.error('Wystąpił błąd podczas aktualizacji danych:', err);
        alert('Wystąpił błąd podczas aktualizacji danych. Proszę spróbować ponownie.');
      }
    });
  }

  usun() {
    this.service.deleteTrip(this.futureTrip.orderId.toString()).subscribe({
      next: () => {
        alert('Transakcja została pomyślnie usunięta.');
        window.location.href = '/admin';
      },
      error: (err) => {
        console.error('Wystąpił błąd podczas usuwania transakcji:', err);
        alert('Wystąpił błąd podczas usuwania transakcji. Proszę spróbować ponownie.');
      }
    });
  }

  toggleEmailSend(): void {
    this.futureTrip.emailSend = !this.futureTrip.emailSend;
  }
}
