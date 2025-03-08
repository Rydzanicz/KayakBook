import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  imports: [
    CommonModule,
    RouterLink
  ],
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {
  traceId: string = '';
  availableHours: string[] = [];
  filteredHours: string[] = [];
  selectedDate: string = '';

  traceHours: Record<string, string[]> = {
    Prawiedniki_Zemborzycki: ['9:00', '10:00', '12:30', '14:00', '16:00'],
    Osmolice_Prawiedniki: ['9:30', '10:30', '13:00', '14:30'],
    Osmolice_Zemborzycki: ['9:00', '10:00', '12:30', '14:00', '16:00']
  };

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.traceId = params['id'];
      this.availableHours = this.getHoursForTrace(this.traceId);
    });
  }

  getHoursForTrace(traceId: string): string[] {
    return this.traceHours[traceId] || [];
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    this.filterHours();
  }

  filterHours(): void {
    if (!this.selectedDate) {
      this.filteredHours = [];
      return;
    }

    const now = new Date();
    const selectedDay = new Date(this.selectedDate);
    if (now.toDateString() === selectedDay.toDateString()) {
      const cutoffTime = new Date(now.getTime() + 4 * 60 * 60 * 1000);

      this.filteredHours = this.availableHours.filter(hour => {
        const [hourStr, minuteStr] = hour.split(':');
        const hourTime = parseInt(hourStr, 10);
        const minuteTime = parseInt(minuteStr, 10);

        const hourDate = new Date();
        hourDate.setHours(hourTime, minuteTime, 0, 0);
        return hourDate > cutoffTime;
      });

    } else {
      this.filteredHours = [...this.availableHours];
    }
  }

  goToKajak(hour: string): void {
    if (!this.selectedDate) {
      alert('Najpierw wybierz datę.');
      return;
    }
    this.router.navigate(['/kajak', this.traceId, hour], {
      queryParams: {selectedDate: this.selectedDate}
    });
  }

  minDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
