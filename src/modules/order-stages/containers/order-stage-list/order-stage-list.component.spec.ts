import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStageListComponent } from './order-stage-list.component';

describe('OrderStageListComponent', () => {
  let component: OrderStageListComponent;
  let fixture: ComponentFixture<OrderStageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
