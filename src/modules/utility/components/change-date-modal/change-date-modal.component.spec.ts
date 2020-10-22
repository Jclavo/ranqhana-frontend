import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDateModalComponent } from './change-date-modal.component';

describe('ChangeDateModalComponent', () => {
  let component: ChangeDateModalComponent;
  let fixture: ComponentFixture<ChangeDateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
