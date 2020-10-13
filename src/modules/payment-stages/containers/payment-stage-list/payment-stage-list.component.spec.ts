import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStageListComponent } from './payment-stage-list.component';

describe('PaymentStageListComponent', () => {
  let component: PaymentStageListComponent;
  let fixture: ComponentFixture<PaymentStageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentStageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
