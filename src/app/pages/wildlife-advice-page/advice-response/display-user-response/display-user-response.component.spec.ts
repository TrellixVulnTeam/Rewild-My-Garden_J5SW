import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserResponseComponent } from './display-user-response.component';

describe('DisplayUserResponseComponent', () => {
  let component: DisplayUserResponseComponent;
  let fixture: ComponentFixture<DisplayUserResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayUserResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUserResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
