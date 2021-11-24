import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollinatorSuggestionsComponent } from './pollinator-suggestions.component';

describe('PollinatorSuggestionsComponent', () => {
  let component: PollinatorSuggestionsComponent;
  let fixture: ComponentFixture<PollinatorSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollinatorSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollinatorSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
