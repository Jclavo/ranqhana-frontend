import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableCompaniesComponent } from './ng-bootstrap-table-companies.component';

describe('NgBootstrapTableCompaniesComponent', () => {
  let component: NgBootstrapTableCompaniesComponent;
  let fixture: ComponentFixture<NgBootstrapTableCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
