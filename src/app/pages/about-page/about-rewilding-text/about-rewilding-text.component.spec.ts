import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRewildingTextComponent } from './about-rewilding-text.component';

describe('AboutRewildingTextComponent', () => {
  let component: AboutRewildingTextComponent;
  let fixture: ComponentFixture<AboutRewildingTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutRewildingTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRewildingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
