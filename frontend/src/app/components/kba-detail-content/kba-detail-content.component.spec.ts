import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaDetailContentComponent } from './kba-detail-content.component';

describe('KbaDetailContentComponent', () => {
  let component: KbaDetailContentComponent;
  let fixture: ComponentFixture<KbaDetailContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaDetailContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
