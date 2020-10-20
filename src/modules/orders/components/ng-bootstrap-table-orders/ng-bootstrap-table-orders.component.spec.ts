import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableOrdersComponent } from './ng-bootstrap-table-orders.component';

describe('NgBootstrapTableOrdersComponent', () => {
  let component: NgBootstrapTableOrdersComponent;
  let fixture: ComponentFixture<NgBootstrapTableOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
