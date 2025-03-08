import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-kajak',
  templateUrl: './kajak.component.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./kajak.component.css']
})
export class KajakComponent implements OnInit {
  traceId: string = '';
  selectedHour: string = '';
  selectedDate: string = '';

  kayakKeys = ['single', 'double', 'family'] as const;
  kayaks: Record<typeof this.kayakKeys[number], { name: string; price: number }> = {
    single: {
      name: 'Kajak 1-osobowy',
      price: 30,
    },
    double: {
      name: 'Kajak 2-osobowy',
      price: 50,
    },
    family: {
      name: 'Kajak rodzinny (2+1)',
      price: 70,
    },
  };

  selectedKayaks: { type: 'single' | 'double' | 'family'; count: number }[] = [];
  maxKayaks = 20;

  constructor(private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.traceId = params['id'] ?? '';
      this.selectedHour = params['hour'] ?? '';
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.selectedDate = queryParams['selectedDate'] || '';
      console.log('Received selectedDate:', this.selectedDate);
    });
  }

  addKayak(type: 'single' | 'double' | 'family'): void {
    const totalSelected = this.selectedKayaks.reduce((sum, kayak) => sum + kayak.count, 0);

    if (totalSelected >= this.maxKayaks) {
      alert('Nie możesz wybrać więcej niż 20 kajaków.');
      return;
    }

    const kayakEntry = this.selectedKayaks.find((kayak) => kayak.type === type);

    if (kayakEntry) {
      kayakEntry.count++;
    } else {
      this.selectedKayaks.push({type, count: 1});
    }
  }

  removeKayak(type: 'single' | 'double' | 'family'): void {
    const kayakEntry = this.selectedKayaks.find((kayak) => kayak.type === type);

    if (kayakEntry && kayakEntry.count > 0) {
      kayakEntry.count--;
      if (kayakEntry.count === 0) {
        this.selectedKayaks = this.selectedKayaks.filter((kayak) => kayak.type !== type);
      }
    }
  }

  calculateTotalPrice(): number {
    return this.selectedKayaks.reduce((total, kayak) => {
      const kayakInfo = this.kayaks[kayak.type];
      return total + (kayakInfo.price * kayak.count);
    }, 0);
  }
}
