import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {KayakBookingService} from '../services/kayak-booking.service';
import {AuthService} from "../services/AuthService";

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

    constructor(private kayakBookingService: KayakBookingService, private authService: AuthService, private router: Router) {
    }

    onLogin(): void {
        this.kayakBookingService.login(this.email, this.password).subscribe({
            next: (response: any) => {
                this.authService.login();
                this.router.navigate(['/admin']);
            },
            error: (error) => {
                this.errorMessage = 'Nieprawidłowe dane logowania';
            },
        });
    }
}
