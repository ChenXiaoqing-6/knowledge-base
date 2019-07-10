import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaDetailComponent } from './kba-detail.component';

describe('KbaDetailComponent', () => {
  let component: KbaDetailComponent;
  let fixture: ComponentFixture<KbaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
