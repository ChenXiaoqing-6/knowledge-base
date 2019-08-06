export class KbViewFacadeMock {
    public openArticle: jasmine.Spy = jasmine.createSpy();
    public getSelectedArticle: jasmine.Spy = jasmine.createSpy();
    public backToSearchPage: jasmine.Spy = jasmine.createSpy();
    public setContentLoadSuccess: jasmine.Spy = jasmine.createSpy();
    public isSearching: jasmine.Spy = jasmine.createSpy();
}