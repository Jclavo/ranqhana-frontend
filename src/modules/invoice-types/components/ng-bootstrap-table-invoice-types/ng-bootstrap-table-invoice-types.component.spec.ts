import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableInvoiceTypesComponent } from './ng-bootstrap-table-invoice-types.component';

describe('NgBootstrapTableInvoiceTypesComponent', () => {
  let component: NgBootstrapTableInvoiceTypesComponent;
  let fixture: ComponentFixture<NgBootstrapTableInvoiceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableInvoiceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableInvoiceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
