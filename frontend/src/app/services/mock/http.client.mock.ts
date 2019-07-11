import {} from 'jasmine';

export class KbaHttpClientMock {
  public get: jasmine.Spy = jasmine.createSpy();
  public post: jasmine.Spy = jasmine.createSpy();
  public patch: jasmine.Spy = jasmine.createSpy();
  public delete: jasmine.Spy = jasmine.createSpy();
}

export class HttpClientMock {
  public request: jasmine.Spy = jasmine.createSpy();
}
