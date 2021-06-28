import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDisplayTestComponent } from './data-display-test.component';

describe('DataDisplayTestComponent', () => {
  let component: DataDisplayTestComponent;
  let fixture: ComponentFixture<DataDisplayTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDisplayTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDisplayTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
