import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableInvoiceStagesComponent } from './ng-bootstrap-table-invoice-stages.component';

describe('NgBootstrapTableInvoiceStagesComponent', () => {
  let component: NgBootstrapTableInvoiceStagesComponent;
  let fixture: ComponentFixture<NgBootstrapTableInvoiceStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableInvoiceStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableInvoiceStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
