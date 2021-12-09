import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPrivacyTextComponent } from './about-privacy-text.component';

describe('AboutPrivacyTextComponent', () => {
  let component: AboutPrivacyTextComponent;
  let fixture: ComponentFixture<AboutPrivacyTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPrivacyTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPrivacyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
