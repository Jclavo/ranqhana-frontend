import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStageModalComponent } from './change-stage-modal.component';

describe('ChangeStageModalComponent', () => {
  let component: ChangeStageModalComponent;
  let fixture: ComponentFixture<ChangeStageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
