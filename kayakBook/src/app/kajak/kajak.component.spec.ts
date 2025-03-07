import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KajakComponent } from './kajak.component';

describe('KajakComponent', () => {
  let component: KajakComponent;
  let fixture: ComponentFixture<KajakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KajakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KajakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
