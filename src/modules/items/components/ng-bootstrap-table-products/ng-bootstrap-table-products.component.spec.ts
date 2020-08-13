import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableProductsComponent } from './ng-bootstrap-table-products.component';

describe('NgBootstrapTableProductsComponent', () => {
  let component: NgBootstrapTableProductsComponent;
  let fixture: ComponentFixture<NgBootstrapTableProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
