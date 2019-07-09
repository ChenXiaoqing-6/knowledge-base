import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaSearchComponent } from './kba-search.component';

describe('KbaSearchComponent', () => {
  let component: KbaSearchComponent;
  let fixture: ComponentFixture<KbaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
