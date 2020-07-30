import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableStockTypesComponent } from './ng-bootstrap-table-stock-types.component';

describe('NgBootstrapTableStockTypesComponent', () => {
  let component: NgBootstrapTableStockTypesComponent;
  let fixture: ComponentFixture<NgBootstrapTableStockTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableStockTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableStockTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
