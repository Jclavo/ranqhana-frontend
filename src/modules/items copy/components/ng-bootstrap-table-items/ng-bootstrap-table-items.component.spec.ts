import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableItemsComponent } from './ng-bootstrap-table-items.component';

describe('NgBootstrapTableItemsComponent', () => {
  let component: NgBootstrapTableItemsComponent;
  let fixture: ComponentFixture<NgBootstrapTableItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
