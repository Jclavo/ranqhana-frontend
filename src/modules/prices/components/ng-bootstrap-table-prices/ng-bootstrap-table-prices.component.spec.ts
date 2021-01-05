import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTablePricesComponent } from './ng-bootstrap-table-prices.component';

describe('NgBootstrapTablePricesComponent', () => {
  let component: NgBootstrapTablePricesComponent;
  let fixture: ComponentFixture<NgBootstrapTablePricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTablePricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTablePricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
