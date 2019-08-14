export class KbSearchFacadeMock {
    public getSelectedArticle: jasmine.Spy = jasmine.createSpy();
    public getArticles: jasmine.Spy = jasmine.createSpy();
    public isInit: jasmine.Spy = jasmine.createSpy();
    public isSearching: jasmine.Spy = jasmine.createSpy();
    public isError: jasmine.Spy = jasmine.createSpy();
    public getTotalObjectCount: jasmine.Spy = jasmine.createSpy();
    public isNotFound: jasmine.Spy = jasmine.createSpy();
    public searchArticles: jasmine.Spy = jasmine.createSpy();
    public loadMoreArticles: jasmine.Spy = jasmine.createSpy();
    public getArticlesBasedLinkage: jasmine.Spy = jasmine.createSpy();
}