import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputOutputComponent } from './form-input-output.component';

describe('FormInputOutputComponent', () => {
  let component: FormInputOutputComponent;
  let fixture: ComponentFixture<FormInputOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
