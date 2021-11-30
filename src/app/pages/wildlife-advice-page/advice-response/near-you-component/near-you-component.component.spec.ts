import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearYouComponentComponent } from './near-you-component.component';

describe('NearYouComponentComponent', () => {
  let component: NearYouComponentComponent;
  let fixture: ComponentFixture<NearYouComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearYouComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearYouComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
