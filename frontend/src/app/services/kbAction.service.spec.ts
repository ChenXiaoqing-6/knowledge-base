import { KbActionService } from './kbAction.service';
import { IArticleAction, ARTICLE_ACTION_TYPE } from '../models/IArticleAction';
import { IArticle } from '../models/IArticle';
import { MockArticle } from '../models/mock/Article.mock';

describe('KbActionService', () => {
    const alertService: jasmine.Spy = jasmine.createSpy();
    let kbActionService: KbActionService;
    beforeEach(() => {
        kbActionService = new KbActionService(<any> alertService);
    });

    it('should be created', () => {
        expect(kbActionService).toBeTruthy();
    });

    it('shold return the copy actions if the parameter of getAction() is "COPY"', () => {
        const copyAction: IArticleAction = kbActionService.getAction(ARTICLE_ACTION_TYPE.DELETE) as IArticleAction;
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
