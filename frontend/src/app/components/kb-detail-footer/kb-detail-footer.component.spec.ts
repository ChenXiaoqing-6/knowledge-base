import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaDetailFooterComponent } from './kb-detail-footer.component';

describe('KbDetailFooterComponent', () => {
  let component: KbaDetailFooterComponent;
  let fixture: ComponentFixture<KbaDetailFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaDetailFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaDetailFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
