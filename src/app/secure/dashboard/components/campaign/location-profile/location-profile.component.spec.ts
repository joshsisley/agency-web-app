import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationProfileComponent } from './location-profile.component';

describe('LocationProfileComponent', () => {
  let component: LocationProfileComponent;
  let fixture: ComponentFixture<LocationProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
