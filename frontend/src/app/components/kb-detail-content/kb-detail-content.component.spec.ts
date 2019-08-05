import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FundamentalNgxModule } from 'fundamental-ngx';

import { KbDetailContentComponent } from './kb-detail-content.component';
import { SafeUrlPipe } from '../../pipes/safeUrl.pipe';
import { KbViewFacade } from '../../state/article/article.facade';
import { MockArticle } from '../../models/mock/Article.mock';

describe('KbDetailContentComponent', () => {
    let component: KbDetailContentComponent;
    let fixture: ComponentFixture<KbDetailContentComponent>;
    const kbViewFacadeSpy: KbViewFacade = jasmine.createSpyObj('KbViewFacade', ['setContentLoadSuccess', 'isSearching']);

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
                { provide: KbViewFacade, useValue: kbViewFacadeSpy }
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
        it('should setContentLoadSuccess when iFrame load event object likes event.target is invalid', () => {
            const event = {
                target: ''
            };
            component.onIFrameLoad(event);
            expect(kbViewFacadeSpy.setContentLoadSuccess).not.toHaveBeenCalled();
        });

        it('should setContentLoadSuccess when iFrame load event object likes event.target.src is invalid', () => {
            const event = {
                target: {
                    src: ''
                }
            };
            component.onIFrameLoad(event);
            expect(kbViewFacadeSpy.setContentLoadSuccess).not.toHaveBeenCalled();
        });
        
        it('should setContentLoadSuccess when iFrame load event object likes event.target.src !== ""', () => {
            const event = {
                target: {
                    src: 'mindTouch'
                }
            };
            component.onIFrameLoad(event);
            expect(kbViewFacadeSpy.setContentLoadSuccess).toHaveBeenCalled();
        });
    });

    describe('changeIFrameHeight', () => {
        it('should set iFrame height if iFrame exist', () => {
            spyOnProperty(document, 'documentElement').and.returnValue(() => {
                return { clientHeight: '500px' }
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
