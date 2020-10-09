import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTablePaymentsComponent } from './ng-bootstrap-table-payments.component';

describe('NgBootstrapTablePaymentsComponent', () => {
  let component: NgBootstrapTablePaymentsComponent;
  let fixture: ComponentFixture<NgBootstrapTablePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTablePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTablePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
