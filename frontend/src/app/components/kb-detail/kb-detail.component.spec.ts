import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { FundamentalNgxModule, ModalRef } from 'fundamental-ngx';
import { of } from 'rxjs';

import { KbDetailComponent } from './kb-detail.component';
import { MockArticle } from '../../models/mock/Article.mock';

@Component({ selector: 'kb-detail-header', template: '' })
class KbDetailHeaderComponent {
  @Input() article: any;
  @Input() isDetailMode: true;
}

@Component({ selector: 'kb-detail-footer', template: '' })
class KbDetailFooterComponent {
  @Input() article: any;
}

@Component({ selector: 'kb-detail-content', template: '' })
class KbDetailContentComponent {
  @Input() article: any;
}

describe('KbDetailComponent', () => {
  let component: KbDetailComponent;
  let fixture: ComponentFixture<KbDetailComponent>;
  let modalRef: ModalRef = new ModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbDetailComponent,
        KbDetailHeaderComponent,
        KbDetailFooterComponent,
        KbDetailContentComponent,
      ],
      imports: [
        FundamentalNgxModule,
      ],
      providers: [
        { provide: ModalRef, useValue: modalRef }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbDetailComponent);
    component = fixture.componentInstance;
    modalRef.data = { article: of(MockArticle) };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
