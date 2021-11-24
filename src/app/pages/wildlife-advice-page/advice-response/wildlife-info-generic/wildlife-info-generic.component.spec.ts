import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildlifeInfoGenericComponent } from './wildlife-info-generic.component';

describe('WildlifeInfoGenericComponent', () => {
  let component: WildlifeInfoGenericComponent;
  let fixture: ComponentFixture<WildlifeInfoGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildlifeInfoGenericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildlifeInfoGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
