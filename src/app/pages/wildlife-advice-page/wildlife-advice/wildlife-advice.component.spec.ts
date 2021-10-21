import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildlifeAdviceComponent } from './wildlife-advice.component';

describe('WildlifeAdviceComponent', () => {
  let component: WildlifeAdviceComponent;
  let fixture: ComponentFixture<WildlifeAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildlifeAdviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildlifeAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
