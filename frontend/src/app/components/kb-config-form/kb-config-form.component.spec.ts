import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbConfigFormComponent } from './kb-config-form.component';

describe('KbConfigFormComponent', () => {
  let component: KbConfigFormComponent;
  let fixture: ComponentFixture<KbConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbConfigFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
