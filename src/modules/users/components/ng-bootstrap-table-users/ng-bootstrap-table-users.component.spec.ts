import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableUsersComponent } from './ng-bootstrap-table-users.component';

describe('NgBootstrapTableUsersComponent', () => {
  let component: NgBootstrapTableUsersComponent;
  let fixture: ComponentFixture<NgBootstrapTableUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
