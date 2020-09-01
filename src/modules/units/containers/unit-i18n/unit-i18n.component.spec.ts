import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitI18nComponent } from './unit-i18n.component';

describe('UnitI18nComponent', () => {
  let component: UnitI18nComponent;
  let fixture: ComponentFixture<UnitI18nComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitI18nComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitI18nComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
