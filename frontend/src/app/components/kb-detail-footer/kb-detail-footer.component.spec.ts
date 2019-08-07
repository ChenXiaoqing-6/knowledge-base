import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { TranslateModule } from '@ngx-translate/core';

import { KbDetailFooterComponent } from './kb-detail-footer.component';

describe('KbDetailFooterComponent', () => {
  let component: KbDetailFooterComponent;
  let fixture: ComponentFixture<KbDetailFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbDetailFooterComponent
      ],
      imports: [
        FundamentalNgxModule,
        TranslateModule.forRoot(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbDetailFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
