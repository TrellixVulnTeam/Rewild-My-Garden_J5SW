import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMainTextComponent } from './about-main-text.component';

describe('AboutMainTextComponent', () => {
  let component: AboutMainTextComponent;
  let fixture: ComponentFixture<AboutMainTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMainTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMainTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
