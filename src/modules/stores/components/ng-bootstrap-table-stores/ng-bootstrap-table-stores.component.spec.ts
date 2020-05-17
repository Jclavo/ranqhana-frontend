import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableStoresComponent } from './ng-bootstrap-table-stores.component';

describe('NgBootstrapTableStoresComponent', () => {
  let component: NgBootstrapTableStoresComponent;
  let fixture: ComponentFixture<NgBootstrapTableStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
