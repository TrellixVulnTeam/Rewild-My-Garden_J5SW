import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildlifeAdviceGenericComponent } from './wildlife-advice-generic.component';

describe('WildlifeAdviceGenericComponent', () => {
  let component: WildlifeAdviceGenericComponent;
  let fixture: ComponentFixture<WildlifeAdviceGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildlifeAdviceGenericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildlifeAdviceGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
