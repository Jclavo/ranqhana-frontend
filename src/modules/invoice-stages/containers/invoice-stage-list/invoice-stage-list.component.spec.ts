import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceStageListComponent } from './invoice-stage-list.component';

describe('InvoiceStageListComponent', () => {
  let component: InvoiceStageListComponent;
  let fixture: ComponentFixture<InvoiceStageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceStageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceStageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
