import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaDetailHeaderComponent } from './kba-detail-header.component';

describe('KbaDetailHeaderComponent', () => {
  let component: KbaDetailHeaderComponent;
  let fixture: ComponentFixture<KbaDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaDetailHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
