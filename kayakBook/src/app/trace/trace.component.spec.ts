import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceComponent } from './trace.component';

describe('TraceComponent', () => {
  let component: TraceComponent;
  let fixture: ComponentFixture<TraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
