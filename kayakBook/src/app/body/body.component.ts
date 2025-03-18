import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Trace {
  id: string;
  description: string;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  traces: Trace[] = [
    { id: 'Prawiedniki_Zemborzycki', description: 'Prawiedniki - Z. Zemborzycki' },
    { id: 'Osmolice_Prawiedniki', description: 'Osmolice - Prawiedniki' },
    { id: 'Osmolice_Zemborzycki', description: 'Osmolice - Z. Zemborzycki' },
  ];
  galleryImages = [
    'assets/gallery/image1.png',
    'assets/gallery/image2.png',
    'assets/gallery/image3.png',
  ];
  currentIndex = 0;

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
  }
}
