import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceI18nComponent } from './invoice-i18n.component';

describe('InvoiceI18nComponent', () => {
  let component: InvoiceI18nComponent;
  let fixture: ComponentFixture<InvoiceI18nComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceI18nComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceI18nComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
