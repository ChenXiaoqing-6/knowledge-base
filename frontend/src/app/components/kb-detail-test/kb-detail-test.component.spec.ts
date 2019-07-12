import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbDetailTestComponent } from './kb-detail-test.component';

describe('KbaDetailTestComponent', () => {
  let component: KbDetailTestComponent;
  let fixture: ComponentFixture<KbDetailTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbDetailTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbDetailTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
