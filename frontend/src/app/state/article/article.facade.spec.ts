import { fakeAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { StoreMock } from '../mock/store.mock';
import { KbViewFacade } from './article.facade';
import { OpenArticle, LoadIFrameContentSuccess } from './article.actions';
import { IArticle } from '../../models/IArticle';
import { MockArticle } from '../../models/mock/Article.mock';

describe('KbViewFacade facade test', () => {
  function setup() {
    const storeMock = new StoreMock();
    const kbViewFacade = new KbViewFacade(
      <any>storeMock
    );

    return {
      kbViewFacade,
      storeMock
    };
  }

  describe(': openArticle ', () => {

    it('shoudl dispatch to open article', () => {
      const service = setup();
      let article: IArticle = MockArticle;

      service.kbViewFacade.openArticle(article);

      expect(service.storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(service.storeMock.dispatch).toHaveBeenCalledWith(new OpenArticle('5001'));

    });
  });

  describe(': isSearching ', () => {

    it('should return true in the state', fakeAsync(() => {
      const service = setup();
      service.storeMock.pipe.and.returnValue(of(true));

      service.kbViewFacade.isSearching().subscribe((_response: any) => {
        expect(_response).toBeTruthy();
        expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
        expect(_response).toBe(true);
      }, _error => {
        expect(_error).toBeFalsy();
      });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
      const service = setup();
      const error = { error: 'TestError' };
      service.storeMock.pipe.and.returnValue(throwError(error));

      service.kbViewFacade.isSearching().subscribe((_response: any) => {
        expect(_response).toBeFalsy();
      }, _error => {
        expect(_error).toBeTruthy();
        expect(service.storeMock.pipe).toHaveBeenCalledTimes(1);
        expect(_error).toBe(error);
      });
    }));
  });

  describe(': setContentLoadSuccess ', () => {

    it('shoudl dispatch to open article', () => {
      const service = setup();
      service.kbViewFacade.setContentLoadSuccess();

      expect(service.storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(service.storeMock.dispatch).toHaveBeenCalledWith(new LoadIFrameContentSuccess());
    });
  });
});
