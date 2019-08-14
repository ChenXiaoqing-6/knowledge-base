import { KbActionService } from './kbAction.service';
import { IArticleAction, ARTICLE_ACTION_TYPE } from '../models/IArticleAction';
import { IArticle } from '../models/IArticle';
import { MockArticle } from '../models/mock/Article.mock';
import { KbLinkedListFacadeMock } from '../state/linkage/mock/linked-article.facade.mock';

describe('KbActionService', () => {
    const alertService: jasmine.Spy = jasmine.createSpy();
    const kbLinkedListFacadeSpy = new KbLinkedListFacadeMock();
    const translateService = jasmine.createSpyObj('TranslateService', ['instant']);
    const clipboardService = jasmine.createSpyObj('ClipboardService', ['copyFromContent']);
    let kbActionService: KbActionService;
    beforeEach(() => {
        kbActionService = new KbActionService(<any>alertService, <any>translateService, <any>kbLinkedListFacadeSpy, <any>clipboardService);
    });

    it('should be created', () => {
        expect(kbActionService).toBeTruthy();
    });

    it('shold return the copy actions if the parameter of getAction() is "COPY"', () => {
        const copyAction: IArticleAction = kbActionService.getAction(ARTICLE_ACTION_TYPE.COPY) as IArticleAction;
        expect(copyAction).toBeTruthy();
        expect(copyAction.handler).toBeTruthy();
    });

    it('shold return the actions with customHandler if the a customHandler input parameter of getAction() is gived', () => {
        const customHandler = (article: IArticle) => {
            expect(article).toBe(MockArticle);
        };
        const copyAction: IArticleAction = kbActionService.getAction(ARTICLE_ACTION_TYPE.DELETE, customHandler) as IArticleAction;
        expect(copyAction).toBeTruthy();
        expect(copyAction.handler).toBeTruthy();
        copyAction.handler(MockArticle);
    });
});
