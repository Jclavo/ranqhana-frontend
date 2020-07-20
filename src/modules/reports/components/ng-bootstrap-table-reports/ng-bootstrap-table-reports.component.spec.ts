import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableReportsComponent } from './ng-bootstrap-table-reports.component';

describe('NgBootstrapTableReportsComponent', () => {
  let component: NgBootstrapTableReportsComponent;
  let fixture: ComponentFixture<NgBootstrapTableReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
