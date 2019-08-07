export class CloudServiceMock {
    public getHttp: jasmine.Spy = jasmine.createSpy();
    public getUrl: jasmine.Spy = jasmine.createSpy();
    public getTranslations: jasmine.Spy = jasmine.createSpy();
  }
