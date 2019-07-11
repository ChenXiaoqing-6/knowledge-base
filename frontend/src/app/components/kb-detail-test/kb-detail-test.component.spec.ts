import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaDetailTestComponent } from './kb-detail-test.component';

describe('KbaDetailTestComponent', () => {
  let component: KbaDetailTestComponent;
  let fixture: ComponentFixture<KbaDetailTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaDetailTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaDetailTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
