import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KayakRentalComponent } from './kayak-rental.component';

describe('KayakRentalComponent', () => {
  let component: KayakRentalComponent;
  let fixture: ComponentFixture<KayakRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KayakRentalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KayakRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
