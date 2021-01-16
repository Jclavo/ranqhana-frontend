import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodePrintModalComponent } from './barcode-print-modal.component';

describe('BarcodePrintModalComponent', () => {
  let component: BarcodePrintModalComponent;
  let fixture: ComponentFixture<BarcodePrintModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodePrintModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodePrintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
