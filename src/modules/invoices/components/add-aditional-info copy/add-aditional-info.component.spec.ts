import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAditionalInfoComponent } from './add-aditional-info.component';

describe('AddAditionalInfoComponent', () => {
  let component: AddAditionalInfoComponent;
  let fixture: ComponentFixture<AddAditionalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAditionalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
