import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {KayakBookingService} from '../services/kayak-booking.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: KayakBookingService, private router: Router) {
  }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.router.navigate(['/admin']); // Przekierowanie do panelu admina
      },
      error: (error) => {
        this.errorMessage = 'Nieprawidłowe dane logowania';
      },
    });
  }
}
