import { fakeAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { StoreMock } from '../mock/store.mock';
import { KbViewFacade } from './article.facade';
import { OpenArticle, LoadIFrameContentSuccess } from './article.actions';
import { MockArticle } from '../../models/mock/Article.mock';
import { KbSearchFacadeMock } from '../search/mock/search-article.facade.mock';
import { KbSuggestedFacadeMock } from '../suggestion/mock/suggested-article.facade.mock';
import { KbLinkedListFacadeMock } from '../linkage/mock/linked-article.facade.mock';
import { KbServiceMock } from '../../services/mock/kb.service.mock';

describe('KbViewFacade facade test', () => {
  function setup() {
    const storeMock = new StoreMock();
    const kbSearchFacadeSpy = new KbSearchFacadeMock();
    const kbSuggestedFacadeSpy = new KbSuggestedFacadeMock();
    const kbLinkedListFacadeSpy = new KbLinkedListFacadeMock();
    const kbService = new KbServiceMock();
    const kbViewFacade = new KbViewFacade(
      <any>storeMock,
      <any>kbSearchFacadeSpy,
      <any>kbSuggestedFacadeSpy,
      <any>kbLinkedListFacadeSpy,
      <any>kbService
    );

    return {
      kbViewFacade,
      storeMock,
      kbSearchFacadeSpy,
      kbSuggestedFacadeSpy,
      kbLinkedListFacadeSpy,
      kbService
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

  describe(': getSelectedArticle ', () => {

    it('shoudl the selected article is from suggested atricle if the suggested has it', fakeAsync(() => {
      const service = setup();
      service.kbSuggestedFacadeSpy.getSelectedArticle.and.returnValue(of(MockArticle));
      service.kbLinkedListFacadeSpy.getSelectedArticle.and.returnValue(of(undefined));
      service.kbSearchFacadeSpy.getSelectedArticle.and.returnValue(of(undefined));
      service.storeMock.pipe.and.returnValue(of(MockArticle));
      service.kbViewFacade.getSelectedArticle('100').subscribe((selectArticle) => {
        expect(selectArticle).toBe(MockArticle);
      });
    }));


  });
});