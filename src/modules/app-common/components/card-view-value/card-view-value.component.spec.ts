import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewValueComponent } from './card-view-value.component';

describe('CardViewValueComponent', () => {
  let component: CardViewValueComponent;
  let fixture: ComponentFixture<CardViewValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardViewValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
