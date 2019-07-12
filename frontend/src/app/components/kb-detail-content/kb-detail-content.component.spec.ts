import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbDetailContentComponent } from './kb-detail-content.component';

describe('KbDetailContentComponent', () => {
  let component: KbDetailContentComponent;
  let fixture: ComponentFixture<KbDetailContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbDetailContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
