import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGardensBodyComponent } from './example-gardens-body.component';

describe('ExampleGardensBodyComponent', () => {
  let component: ExampleGardensBodyComponent;
  let fixture: ComponentFixture<ExampleGardensBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleGardensBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleGardensBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
