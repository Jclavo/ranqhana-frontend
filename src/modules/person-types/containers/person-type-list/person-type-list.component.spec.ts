import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTypeListComponent } from './person-type-list.component';

describe('PersonTypeListComponent', () => {
  let component: PersonTypeListComponent;
  let fixture: ComponentFixture<PersonTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
