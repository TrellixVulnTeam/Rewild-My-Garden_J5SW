import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollinatorDialogComponent } from './pollinator-dialog.component';

describe('PollinatorDialogComponent', () => {
  let component: PollinatorDialogComponent;
  let fixture: ComponentFixture<PollinatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollinatorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollinatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
