import { fakeAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AppConfig } from '../../config';
import { CloudService } from './cloud.service';
import { BaseHttpClientMock } from './mock/http.client.mock';

describe('cloud service test', () => {

  function setup() {

    const httpMock = new BaseHttpClientMock();
    const cloudService = new CloudService(
      <any>httpMock
    );

    return {
      cloudService,
      httpMock
    };
  }

  describe(': getTranslations ', () => {

    it('should get the translations', fakeAsync(() => {
      const serviceMock = setup();
      const response = {translation: 'TestResponse'};
      const language: string = 'it';
      const expectedUrl = `${AppConfig.facadeBaseURL}/localisation/${language}`;

      serviceMock.httpMock.get.and.returnValue(of(response));

      serviceMock.cloudService.getTranslations(language).subscribe((_response: any) => {
        expect(_response).toBeTruthy();

        expect(serviceMock.httpMock.get).toHaveBeenCalledTimes(1);
        expect(serviceMock.httpMock.get).toHaveBeenCalledWith(expectedUrl);
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('should throw error -> request fails', fakeAsync(() => {
      const serviceMock = setup();
      const language: string = 'de';
      const expectedUrl = `${AppConfig.facadeBaseURL}/localisation/${language}`;
      const error = {error: 'TestError'};

      serviceMock.httpMock.get.and.returnValue(throwError(error));

      serviceMock.cloudService.getTranslations(language).subscribe((_response: any) => {
        expect(_response).toBeFalsy();
      }, _error => {
        expect(_error).toBeTruthy();
        expect(_error).toBe(error);

        expect(serviceMock.httpMock.get).toHaveBeenCalledTimes(1);
        expect(serviceMock.httpMock.get).toHaveBeenCalledWith(expectedUrl);
      });
    }));
  });

});
