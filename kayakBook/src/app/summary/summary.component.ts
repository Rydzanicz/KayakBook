import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {
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
}
