import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MadePaymentModalComponent } from './made-payment-modal.component';

describe('MadePaymentModalComponent', () => {
  let component: MadePaymentModalComponent;
  let fixture: ComponentFixture<MadePaymentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MadePaymentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadePaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
