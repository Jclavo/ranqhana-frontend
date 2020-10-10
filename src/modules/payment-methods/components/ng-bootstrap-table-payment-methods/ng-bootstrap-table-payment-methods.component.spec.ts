import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTablePaymentMethodsComponent } from './ng-bootstrap-table-payment-methods.component';

describe('NgBootstrapTablePaymentMethodsComponent', () => {
  let component: NgBootstrapTablePaymentMethodsComponent;
  let fixture: ComponentFixture<NgBootstrapTablePaymentMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTablePaymentMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTablePaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
