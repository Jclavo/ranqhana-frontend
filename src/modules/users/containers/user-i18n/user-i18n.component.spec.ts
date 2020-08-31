import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserI18nComponent } from './user-i18n.component';

describe('UserI18nComponent', () => {
  let component: UserI18nComponent;
  let fixture: ComponentFixture<UserI18nComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserI18nComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserI18nComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
