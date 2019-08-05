import { fakeAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { StoreMock } from '../mock/store.mock';
import { KbViewFacade } from './article.facade';
import { OpenArticle, LoadIFrameContentSuccess } from './article.actions';

describe('KbViewFacade facade test', () => {
  function setup() {
    const storeMock = new StoreMock();
    const kbSearchFacadeSpy = jasmine.createSpyObj('KbSearchFacade', ['getSelectedArticle']);
    const kbSuggestedFacadeSpy = jasmine.createSpyObj('KbSuggestedFacade', ['getSelectedArticle']);
    const kbLinkedListFacadeSpy = jasmine.createSpyObj('KbLinkedListFacade', ['getSelectedArticle']);
    const kbService = jasmine.createSpyObj('KbService', ['getArticle']);
    const kbViewFacade = new KbViewFacade(
      <any>storeMock,
      kbSearchFacadeSpy,
      kbSuggestedFacadeSpy,
      kbLinkedListFacadeSpy,
      kbService
    );

    return {
      kbViewFacade,
      storeMock
    };
  }

  describe(': openArticle ', () => {

    it('shoudl dispatch to open article', () => {
      const service = setup();
      const articleId = '100';

      service.kbViewFacade.openArticle(articleId);

      expect(service.storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(service.storeMock.dispatch).toHaveBeenCalledWith(new OpenArticle(articleId));

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
