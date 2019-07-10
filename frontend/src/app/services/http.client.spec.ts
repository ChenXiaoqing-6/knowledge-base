import { fakeAsync } from '@angular/core/testing';
import { HttpClientMock } from './mock/http.client.mock';
import { BaseHttpClient } from './http.client';
import { of } from 'rxjs';

describe('http client test', () => {

  function setup() {

    const httpMock = new HttpClientMock();
    const client = new BaseHttpClient(
      <any>httpMock
    );

    return {
      client,
      httpMock
    };
  }

  describe(': get ', () => {

    it('should request the right url', fakeAsync(() => {
      const service = setup();
      const url = 'https://testUrl.com';
      const httpResponse = { response: 'TestResponse' };

      service.client.request = jasmine.createSpy().and.returnValue(of(httpResponse));

      service.client.get(url).subscribe((_result: any) => {
        expect(_result).toBeTruthy();
        expect(_result).toBe(httpResponse);

        expect(service.client.request).toHaveBeenCalledTimes(1);
        expect(service.client.request).toHaveBeenCalledWith(url, 'GET', { body: null });
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('throw error for invalid urls - empty', fakeAsync(() => {
      const service = setup();
      const url = '';

      service.client.request = jasmine.createSpy();

      service.client.get(url).subscribe((_result: any) => {
        expect(_result).toBeFalsy();
      }, _error => {
        expect(_error).toBeTruthy();
        expect(_error).toBe('Invalid URL');

        expect(service.client.request).not.toHaveBeenCalled();
      });
    }));
  });

  describe(': post ', () => {

    it('should request the right url (without responseType) - with body', fakeAsync(() => {
      const service = setup();
      const url = 'https://testUrl.com';
      const httpResponse = { response: 'TestResponse' };
      const body = { body: 'TestBody' };

      service.client.request = jasmine.createSpy().and.returnValue(of(httpResponse));

      service.client.post(url, body).subscribe((_result: any) => {
        expect(_result).toBeTruthy();
        expect(_result).toBe(httpResponse);

        expect(service.client.request).toHaveBeenCalledTimes(1);
        expect(service.client.request).toHaveBeenCalledWith(url, 'POST', { body });
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('should request the right url (without responseType) - body null', fakeAsync(() => {
      const service = setup();
      const url = 'https://testUrl.com';
      const httpResponse = { response: 'TestResponse' };
      const body = null;

      service.client.request = jasmine.createSpy().and.returnValue(of(httpResponse));

      service.client.post(url, body).subscribe((_result: any) => {
        expect(_result).toBeTruthy();
        expect(_result).toBe(httpResponse);

        expect(service.client.request).toHaveBeenCalledTimes(1);
        expect(service.client.request).toHaveBeenCalledWith(url, 'POST', { body });
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('throw error for invalid urls (without responseType) - empty', fakeAsync(() => {
      const service = setup();
      const url = '';
      const body = null;

      service.client.request = jasmine.createSpy();

      service.client.post(url, body).subscribe((_result: any) => {
        expect(_result).toBeFalsy();
      }, _error => {
        expect(_error).toBeTruthy();
        expect(_error).toBe('Invalid URL');

        expect(service.client.request).not.toHaveBeenCalled();
      });
    }));

    it('should request the right url (with responseType)', fakeAsync(() => {
      const service = setup();
      const url = 'https://testUrl.com';
      const httpResponse = { response: 'TestResponse' };
      const body = { body: 'TestBody' };
      const responseType = 'TestResType';

      service.client.request = jasmine.createSpy().and.returnValue(of(httpResponse));

      service.client.post(url, body, responseType).subscribe((_result: any) => {
        expect(_result).toBeTruthy();
        expect(_result).toBe(httpResponse);

        expect(service.client.request).toHaveBeenCalledTimes(1);
        expect(service.client.request).toHaveBeenCalledWith(url, 'POST', { body, responseType });
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('throw error for invalid urls (with responseType) - empty', fakeAsync(() => {
      const service = setup();
      const url = '';
      const body = null;
      const responseType = 'TestResType';

      service.client.request = jasmine.createSpy();

      service.client.post(url, body, responseType).subscribe((_result: any) => {
        expect(_result).toBeFalsy();
      }, _error => {
        expect(_error).toBeTruthy();
        expect(_error).toBe('Invalid URL');

        expect(service.client.request).not.toHaveBeenCalled();
      });
    }));
  });

  describe(': patch ', () => {

    it('should request the right url - with body', fakeAsync(() => {
      const service = setup();
      const url = 'https://testUrl.com';
      const httpResponse = { response: 'TestResponse' };
      const body = { body: 'TestBody' };

      service.client.request = jasmine.createSpy().and.returnValue(of(httpResponse));

      service.client.patch(url, body).subscribe((_result: any) => {
        expect(_result).toBeTruthy();
        expect(_result).toBe(httpResponse);

        expect(service.client.request).toHaveBeenCalledTimes(1);
        expect(service.client.request).toHaveBeenCalledWith(url, 'PATCH', { body });
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('should request the right url - with null-body', fakeAsync(() => {
      const service = setup();
      const url = 'https://testUrl.com';
      const httpResponse = { response: 'TestResponse' };
      const body = null;

      service.client.request = jasmine.createSpy().and.returnValue(of(httpResponse));

      service.client.patch(url, body).subscribe((_result: any) => {
        expect(_result).toBeTruthy();
        expect(_result).toBe(httpResponse);

        expect(service.client.request).toHaveBeenCalledTimes(1);
        expect(service.client.request).toHaveBeenCalledWith(url, 'PATCH', { body });
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('throw error for invalid urls - empty', fakeAsync(() => {
      const service = setup();
      const url = '';
      const body = null;

      service.client.request = jasmine.createSpy();

      service.client.patch(url, body).subscribe((_result: any) => {
        expect(_result).toBeFalsy();
      }, _error => {
        expect(_error).toBeTruthy();
        expect(_error).toBe('Invalid URL');

        expect(service.client.request).not.toHaveBeenCalled();
      });
    }));
  });

  describe(': delete ', () => {

    it('should request the right url', fakeAsync(() => {
      const service = setup();
      const url = 'https://testUrl.com';
      const httpResponse = { response: 'TestResponse' };

      service.client.request = jasmine.createSpy().and.returnValue(of(httpResponse));

      service.client.delete(url).subscribe((_result: any) => {
        expect(_result).toBeTruthy();
        expect(_result).toBe(httpResponse);

        expect(service.client.request).toHaveBeenCalledTimes(1);
        expect(service.client.request).toHaveBeenCalledWith(url, 'DELETE', { body: null });
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('throw error for invalid urls - empty', fakeAsync(() => {
      const service = setup();
      const url = '';

      service.client.request = jasmine.createSpy();

      service.client.delete(url).subscribe((_result: any) => {
        expect(_result).toBeFalsy();
      }, _error => {
        expect(_error).toBeTruthy();
        expect(_error).toBe('Invalid URL');

        expect(service.client.request).not.toHaveBeenCalled();
      });
    }));
  });

  describe(': request ', () => {

    it('should request the right url - GET and no options', fakeAsync(() => {
      const service = setup();
      const url = 'https://testUrl.com';
      const method = 'GET';
      const httpResponse = { response: 'TestResponse' };

      service.httpMock.request.and.returnValue(of(httpResponse));

      service.client.request(url, method).subscribe((_result: any) => {
        expect(_result).toBeTruthy();
        expect(_result).toBe(httpResponse);

        expect(service.httpMock.request).toHaveBeenCalledTimes(1);
        expect(service.httpMock.request).toHaveBeenCalledWith(method, url, undefined);
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('should request the right url - POST and options', fakeAsync(() => {
      const service = setup();
      const url = 'https://testUrl.com';
      const method = 'POST';
      const httpResponse = { response: 'TestResponse' };
      const options = { options: 'TestOptions' };

      service.httpMock.request.and.returnValue(of(httpResponse));

      service.client.request(url, method, options).subscribe((_result: any) => {
        expect(_result).toBeTruthy();
        expect(_result).toBe(httpResponse);

        expect(service.httpMock.request).toHaveBeenCalledTimes(1);
        expect(service.httpMock.request).toHaveBeenCalledWith(method, url, options);
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('throw error for invalid urls - empty', fakeAsync(() => {
      const service = setup();
      const url = '';
      const method = 'GET';

      service.client.request(url, method).subscribe((_result: any) => {
        expect(_result).toBeFalsy();
      }, _error => {
        expect(_error).toBeTruthy();
        expect(_error).toBe('Invalid URL');

        expect(service.httpMock.request).not.toHaveBeenCalled();
      });
    }));
  });
});
