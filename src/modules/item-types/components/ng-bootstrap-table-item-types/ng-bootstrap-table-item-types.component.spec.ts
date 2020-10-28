import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableItemTypesComponent } from './ng-bootstrap-table-item-types.component';

describe('NgBootstrapTableItemTypesComponent', () => {
  let component: NgBootstrapTableItemTypesComponent;
  let fixture: ComponentFixture<NgBootstrapTableItemTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableItemTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableItemTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
