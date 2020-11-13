import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTablePersonTypesComponent } from './ng-bootstrap-table-person-types.component';

describe('NgBootstrapTablePersonTypesComponent', () => {
  let component: NgBootstrapTablePersonTypesComponent;
  let fixture: ComponentFixture<NgBootstrapTablePersonTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTablePersonTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTablePersonTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
