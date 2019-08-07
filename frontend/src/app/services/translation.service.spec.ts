import { fakeAsync, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CloudService } from './cloud.service';
import { CloudServiceMock } from './mock/cloud.service.mock';
import { TranslateServiceMock } from './mock/translate.service.mock';
import { TranslationService } from './translation.service';
import { HttpClientModule } from '@angular/common/http';


/* tslint:disable */
describe('translation service test', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        TranslationService,
        {
          provide: CloudService,
          useValue: new CloudServiceMock()
        },
        {
          provide: TranslateService,
          useValue: new TranslateServiceMock()
        }
      ]
    });
  })

  describe(': loadTranslations ', () => {

    it('should load with set language', fakeAsync(() => {
      const language = 'de';
      const translations = [];
      const cloudService = TestBed.get(CloudService);
      cloudService.getTranslations.and.returnValue(of(translations));
      const translateService = TestBed.get(TranslateService);
      const translationService: TranslationService = TestBed.get(TranslationService);

      translationService.loadTranslations(language).subscribe((_response: string) => {
        expect(cloudService.getTranslations).toHaveBeenCalledTimes(1);
        expect(cloudService.getTranslations).toHaveBeenCalledWith(language);
        expect(translateService.setTranslation).toHaveBeenCalledTimes(1);
        expect(translateService.setTranslation).toHaveBeenCalledWith(language, translations, true);
        expect(_response).toBe(language);
      });
    }));

    it('should throw observable error', fakeAsync(() => {
      const language = 'de';
      const error = { error: 'TestError' };
      const cloudService = TestBed.get(CloudService);
      cloudService.getTranslations.and.returnValue(throwError(error));
      const translateService = TestBed.get(TranslateService);
      const translationService: TranslationService = TestBed.get(TranslationService);

      translationService.loadTranslations(language).subscribe(
        (_response: string) => {
          expect(_response).toBeFalsy();
        },
        (_error) => {
          expect(_error).toBeTruthy();
          expect(cloudService.getTranslations).toHaveBeenCalledTimes(1);
          expect(cloudService.getTranslations).toHaveBeenCalledWith(language);
          expect(translateService.setTranslation).not.toHaveBeenCalled();
          expect(_error).toBe(error);
        });
    }));

  })

});
