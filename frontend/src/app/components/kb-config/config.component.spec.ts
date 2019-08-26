import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbConfigComponent } from './config.component';

describe('ConfigComponent', () => {
  let component: KbConfigComponent;
  let fixture: ComponentFixture<KbConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
