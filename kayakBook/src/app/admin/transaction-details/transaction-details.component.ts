import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FutureTrip} from "../../models/future-trip.model";

@Component({
    selector: 'app-transaction-details',
    templateUrl: './transaction-details.component.html',
    styleUrls: ['./transaction-details.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule],
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
        private route: ActivatedRoute
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
}
