import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTableOrderStagesComponent } from './ng-bootstrap-table-order-stages.component';

describe('NgBootstrapTableOrderStagesComponent', () => {
  let component: NgBootstrapTableOrderStagesComponent;
  let fixture: ComponentFixture<NgBootstrapTableOrderStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapTableOrderStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTableOrderStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
