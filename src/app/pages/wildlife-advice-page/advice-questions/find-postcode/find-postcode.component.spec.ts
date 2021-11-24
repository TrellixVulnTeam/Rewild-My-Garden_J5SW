import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPostcodeComponent } from './find-postcode.component';

describe('FindPostcodeComponent', () => {
  let component: FindPostcodeComponent;
  let fixture: ComponentFixture<FindPostcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPostcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPostcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
