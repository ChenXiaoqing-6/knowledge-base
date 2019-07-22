import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbSuggestedListComponent } from './kb-suggested-list.component';

describe('KbSuggestedListComponent', () => {
  let component: KbSuggestedListComponent;
  let fixture: ComponentFixture<KbSuggestedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbSuggestedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbSuggestedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
