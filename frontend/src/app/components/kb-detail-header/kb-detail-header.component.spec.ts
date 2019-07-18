import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';

import { KbDetailHeaderComponent } from './kb-detail-header.component';
import { MockArticle } from '../../models/mock/Article.mock';

describe('KbDetailHeaderComponent', () => {
  let component: KbDetailHeaderComponent;
  let fixture: ComponentFixture<KbDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbDetailHeaderComponent
      ],
      imports: [
        FundamentalNgxModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbDetailHeaderComponent);
    component = fixture.componentInstance;
    component.article = MockArticle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
