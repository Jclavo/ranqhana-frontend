import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableUnitsComponent } from './ng-bootstrap-table-units.component';

describe('NgBootstrapTableUnitsComponent', () => {
  let component: NgBootstrapTableUnitsComponent;
  let fixture: ComponentFixture<NgBootstrapTableUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
