import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

interface Trace {
  id: string;
  description: string;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  imports: [
    CommonModule,
    RouterLink
  ],
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  traces: Trace[] = [
    {id: 'Prawiedniki_Zemborzycki', description: 'Prawiedniki - Z. Zemborzycki'},
    {id: 'Osmolice_Prawiedniki', description: 'Osmolice - Prawiedniki'},
    {id: 'Osmolice_Zemborzycki', description: 'Osmolice - Z. Zemborzycki'}
  ];
}
