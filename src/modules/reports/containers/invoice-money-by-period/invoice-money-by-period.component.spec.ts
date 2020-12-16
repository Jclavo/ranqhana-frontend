import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMoneyByPeriodComponent } from './invoice-money-by-period.component';

describe('InvoiceMoneyByPeriodComponent', () => {
  let component: InvoiceMoneyByPeriodComponent;
  let fixture: ComponentFixture<InvoiceMoneyByPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceMoneyByPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMoneyByPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
