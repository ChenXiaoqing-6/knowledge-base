import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';

import { KbDetailContentComponent } from './kb-detail-content.component';
import { SafeUrlPipe } from '../../pipes/safeUrl.pipe';
import { KbViewFacade } from '../../state/article/article.facade';
import { StoreMock } from '../../state/mock/store.mock';
import { MockArticle } from '../../models/mock/Article.mock';

describe('KbDetailContentComponent', () => {
  let component: KbDetailContentComponent;
  let fixture: ComponentFixture<KbDetailContentComponent>;
  let kbViewFacade: KbViewFacade = new KbViewFacade(<any>new StoreMock());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KbDetailContentComponent,
        SafeUrlPipe
      ],
      imports: [
        FundamentalNgxModule,
      ],
      providers: [
        { provide: KbViewFacade, useValue: kbViewFacade }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbDetailContentComponent);
    component = fixture.componentInstance;
    component.article = MockArticle;
    spyOn(component, 'changeIFrameHeight');
    fixture.detectChanges();
  });

  it('should create KbDetailContentComponent instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onIFrameLoad', () => {
    it('should setContentLoadSuccess when iFrame load event object likes event.target.src !== ""', () => {
      let KbViewFacadeSpy = spyOn(kbViewFacade, 'setContentLoadSuccess');
      let event = {
        target: {
          src: "mindTouch"
        }
      };
      component.onIFrameLoad(event);
      expect(KbViewFacadeSpy).toHaveBeenCalledTimes(1);
    });

    it('should setContentLoadSuccess when iFrame load event object likes event.target is invalid', () => {
      let KbViewFacadeSpy = spyOn(kbViewFacade, 'setContentLoadSuccess');
      let event = {
        target: ""
      };
      component.onIFrameLoad(event);
      expect(KbViewFacadeSpy).not.toHaveBeenCalled();
    });

    it('should setContentLoadSuccess when iFrame load event object likes event.target.src is invalid', () => {
      let KbViewFacadeSpy = spyOn(kbViewFacade, 'setContentLoadSuccess');
      let event = {
        target: {
          src: ""
        }
      };
      component.onIFrameLoad(event);
      expect(KbViewFacadeSpy).not.toHaveBeenCalled();
    });
  });

  describe('changeIFrameHeight', () => {
    it('should set iFrame height if iFrame exist', () => {
      spyOnProperty(document, 'documentElement').and.returnValue(() => {
        return {clientHeight: '500px'}
      });
      spyOn(document, 'getElementById').and.callFake(() => {
        return {
          setAttribute: function (key) {
            expect(key).toBe('height');
          }
        }
      });
      component.changeIFrameHeight();
    });

  });
});
