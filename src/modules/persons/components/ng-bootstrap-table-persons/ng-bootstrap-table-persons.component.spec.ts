import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTablePersonsComponent } from './ng-bootstrap-table-persons.component';

describe('NgBootstrapTablePersonsComponent', () => {
  let component: NgBootstrapTablePersonsComponent;
  let fixture: ComponentFixture<NgBootstrapTablePersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTablePersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTablePersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
