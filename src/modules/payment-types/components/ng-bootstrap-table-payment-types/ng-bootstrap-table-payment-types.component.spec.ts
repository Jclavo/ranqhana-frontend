import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTablePaymentTypesComponent } from './ng-bootstrap-table-payment-types.component';

describe('NgBootstrapTablePaymentTypesComponent', () => {
  let component: NgBootstrapTablePaymentTypesComponent;
  let fixture: ComponentFixture<NgBootstrapTablePaymentTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTablePaymentTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTablePaymentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
