import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTablePaymentStagesComponent } from './ng-bootstrap-table-payment-stages.component';

describe('NgBootstrapTablePaymentStagesComponent', () => {
  let component: NgBootstrapTablePaymentStagesComponent;
  let fixture: ComponentFixture<NgBootstrapTablePaymentStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTablePaymentStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTablePaymentStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
