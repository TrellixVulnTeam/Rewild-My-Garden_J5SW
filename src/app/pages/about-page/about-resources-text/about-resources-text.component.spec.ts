import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutResourcesTextComponent } from './about-resources-text.component';

describe('AboutResourcesTextComponent', () => {
  let component: AboutResourcesTextComponent;
  let fixture: ComponentFixture<AboutResourcesTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutResourcesTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutResourcesTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
