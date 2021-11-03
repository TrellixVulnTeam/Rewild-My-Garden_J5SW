import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildlifeLayoutComponent } from './wildlife-layout.component';

describe('WildlifeLayoutComponent', () => {
  let component: WildlifeLayoutComponent;
  let fixture: ComponentFixture<WildlifeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildlifeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildlifeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
