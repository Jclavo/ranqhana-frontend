import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableServicesComponent } from './ng-bootstrap-table-services.component';

describe('NgBootstrapTableServicesComponent', () => {
  let component: NgBootstrapTableServicesComponent;
  let fixture: ComponentFixture<NgBootstrapTableServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
