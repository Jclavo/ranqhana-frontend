import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableInvoicesComponent } from './ng-bootstrap-table-invoices.component';

describe('NgBootstrapTableInvoicesComponent', () => {
  let component: NgBootstrapTableInvoicesComponent;
  let fixture: ComponentFixture<NgBootstrapTableInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
