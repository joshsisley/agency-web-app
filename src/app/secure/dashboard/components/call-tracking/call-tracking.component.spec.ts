import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTrackingComponent } from './call-tracking.component';

describe('CallTrackingComponent', () => {
  let component: CallTrackingComponent;
  let fixture: ComponentFixture<CallTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
