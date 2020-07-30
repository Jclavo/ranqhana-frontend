import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTypeListComponent } from './stock-type-list.component';

describe('StockTypeListComponent', () => {
  let component: StockTypeListComponent;
  let fixture: ComponentFixture<StockTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
