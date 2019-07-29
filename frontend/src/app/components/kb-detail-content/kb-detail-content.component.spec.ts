import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';

import { KbDetailContentComponent } from './kb-detail-content.component';
import { SafeUrlPipe } from '../../pipes/safeUrl.pipe';
import { KbViewFacade } from '../../state/article/article.facade';
import { IArticle } from '../../models/IArticle';
import { RenderType } from '../../models/RenderType.enum';
import { StoreMock } from '../../state/mock/store.mock';

describe('KbDetailContentComponent', () => {
  let component: KbDetailContentComponent;
  let fixture: ComponentFixture<KbDetailContentComponent>;
  let kbViewFacade: KbViewFacade = new KbViewFacade(<any>new StoreMock());
  let article: IArticle;

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
    article = {
      id: '',
      provider: '',
      title: '',
      lastUpdated: new Date(),
      score: 0,
      link: '',
      renderType: RenderType.IFRAME,
      renderValue: 'http',
      views: 0,
      author: ''
    };
    component.article = article;
    fixture.detectChanges();
  });

  it('should create KbDetailContentComponent instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should trigger message event', () => {
      let spy = jasmine.createSpy('message');
      let changeIFrameHeightSpy = spyOn(component, 'setIFrameHeight');
      window.addEventListener('message', () => {
        component.ngOnInit();
        expect(changeIFrameHeightSpy).toHaveBeenCalledTimes(1);
        spy();
      });
      window.postMessage('test', '*');
    });
  });

  describe('onIFrameLoad', () => {
    it('should setContentLoadSuccess when iFrame load event object likes event.target.src !== ""', () => {
      let KbViewFacadeSpy = spyOn(kbViewFacade, 'setContentLoadSuccess');
      let event = {
        target: {
          src: "mindTouch"
        }
      };
      spyOn(document, 'getElementById').and.callFake(() => {
        return {
          contentWindow: {
            postMessage: function (msg) {
              expect(msg.hasOwnProperty("FrameHeight")).toBe(true);
            }
          }
        }
      });
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
    it('should set iFrame height when event.data.hasOwnProperty("FrameHeight") == true', () => {
      let event = {
        data: {
          FrameHeight: '600px',
          iframeId: 'iFrameId'
        }
      };
      spyOn(document, 'getElementById').and.callFake(() => {
        return {
          setAttribute: function (key, value) {
            expect(key).toBe('height');
            expect(value).toBe(event.data.FrameHeight);
          }
        }
      });
      component.changeIFrameHeight(event);
    });

    it('should not set iFrame height when event object does not have data attribute', () => {
      let event = {};
      let getElementByIdSpy = spyOn(document, 'getElementById');
      component.changeIFrameHeight(event);
      expect(getElementByIdSpy).not.toHaveBeenCalled();
    });

    it('should not set iFrame height when event.data.hasOwnProperty("FrameHeight") == false', () => {
      let event = {
        data: {}
      };
      let getElementByIdSpy = spyOn(document, 'getElementById');
      component.changeIFrameHeight(event);
      expect(getElementByIdSpy).not.toHaveBeenCalled();
    });
  });
});
