import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMoneyByPaymentTypeComponent } from './invoice-money-by-payment-type.component';

describe('InvoiceMoneyByPaymentTypeComponent', () => {
  let component: InvoiceMoneyByPaymentTypeComponent;
  let fixture: ComponentFixture<InvoiceMoneyByPaymentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceMoneyByPaymentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMoneyByPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
