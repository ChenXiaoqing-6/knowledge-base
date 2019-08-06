export class KbSuggestedFacadeMock {
    public getSelectedArticle: jasmine.Spy = jasmine.createSpy();
    public getArticles: jasmine.Spy = jasmine.createSpy();
    public getLinkedArticles: jasmine.Spy = jasmine.createSpy();
    public getTotalObjectCount: jasmine.Spy = jasmine.createSpy();
    public isInit: jasmine.Spy = jasmine.createSpy();
    public isError: jasmine.Spy = jasmine.createSpy();
    public isLinkingArticles: jasmine.Spy = jasmine.createSpy();
    public isLoadingSuggestedAticles: jasmine.Spy = jasmine.createSpy();
    public getSuggestedArticle: jasmine.Spy = jasmine.createSpy();
}