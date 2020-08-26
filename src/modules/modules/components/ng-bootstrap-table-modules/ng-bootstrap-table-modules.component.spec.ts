import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableModulesComponent } from './ng-bootstrap-table-modules.component';

describe('NgBootstrapTableModulesComponent', () => {
  let component: NgBootstrapTableModulesComponent;
  let fixture: ComponentFixture<NgBootstrapTableModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
