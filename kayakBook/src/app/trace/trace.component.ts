import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
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

  traceHours: Record<string, string[]> = {
    Prawiedniki_Zemborzycki: ['9:00', '10:00', '12:30', '14:00', '16:00'],
    Osmolice_Prawiedniki: ['9:30', '10:30', '13:00', '14:30'],
    Osmolice_Zemborzycki: ['9:00', '10:00', '12:30', '14:00', '16:00']
  };

  constructor(private route: ActivatedRoute) {
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
}
