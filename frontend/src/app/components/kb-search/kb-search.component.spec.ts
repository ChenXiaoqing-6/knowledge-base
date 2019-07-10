import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbSearchComponent } from './kb-search.component';

describe('KbSearchComponent', () => {
  let component: KbSearchComponent;
  let fixture: ComponentFixture<KbSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
