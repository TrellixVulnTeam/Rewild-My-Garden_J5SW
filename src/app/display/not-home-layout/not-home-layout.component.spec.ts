import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotHomeLayoutComponent } from './not-home-layout.component';

describe('NotHomeLayoutComponent', () => {
  let component: NotHomeLayoutComponent;
  let fixture: ComponentFixture<NotHomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotHomeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotHomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
