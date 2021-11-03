import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildlifeMultiplechoiceComponent } from './wildlife-multiplechoice.component';

describe('WildlifeMultiplechoiceComponent', () => {
  let component: WildlifeMultiplechoiceComponent;
  let fixture: ComponentFixture<WildlifeMultiplechoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildlifeMultiplechoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildlifeMultiplechoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
