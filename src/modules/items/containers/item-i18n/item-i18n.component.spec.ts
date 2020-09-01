import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemI18nComponent } from './item-i18n.component';

describe('ItemI18nComponent', () => {
  let component: ItemI18nComponent;
  let fixture: ComponentFixture<ItemI18nComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemI18nComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemI18nComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
