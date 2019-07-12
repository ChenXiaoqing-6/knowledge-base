import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbDetailHeaderComponent } from './kb-detail-header.component';

describe('KbDetailHeaderComponent', () => {
  let component: KbDetailHeaderComponent;
  let fixture: ComponentFixture<KbDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbDetailHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
