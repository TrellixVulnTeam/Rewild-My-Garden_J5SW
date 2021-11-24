import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildlifeAdviceDialogComponent } from './wildlife-advice-dialog.component';

describe('WildlifeAdviceDialogComponent', () => {
  let component: WildlifeAdviceDialogComponent;
  let fixture: ComponentFixture<WildlifeAdviceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildlifeAdviceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildlifeAdviceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
