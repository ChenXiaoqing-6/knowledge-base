import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaDetailFooterComponent } from './kba-detail-footer.component';

describe('KbaDetailFooterComponent', () => {
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
