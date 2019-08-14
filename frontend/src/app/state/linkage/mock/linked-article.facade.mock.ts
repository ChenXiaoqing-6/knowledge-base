export class KbLinkedListFacadeMock {
    public getSelectedArticle: jasmine.Spy = jasmine.createSpy();
    public getArticles: jasmine.Spy = jasmine.createSpy();
    public getLinkedArticles: jasmine.Spy = jasmine.createSpy();
    public getTotalObjectCount: jasmine.Spy = jasmine.createSpy();
    public isInit: jasmine.Spy = jasmine.createSpy();
    public isError: jasmine.Spy = jasmine.createSpy();
    public isLinkingArticles: jasmine.Spy = jasmine.createSpy();
    public unlinkArticle: jasmine.Spy = jasmine.createSpy();
    public linkArticle: jasmine.Spy = jasmine.createSpy();
}