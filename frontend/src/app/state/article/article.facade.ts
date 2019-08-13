import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { combineLatest, } from 'rxjs/operators';
import { IKbState } from '../index';
import { OpenArticle, BackArticle, LoadIFrameContentSuccess } from './article.actions';
import { selectIsContentLoading } from './article.selectors';
import { KbSearchFacade } from '../search/search-article.facade';
import { KbSuggestedFacade } from '../suggestion/suggested-article.facade';
import { IArticle } from '../../models/IArticle';

import { KbService } from '../../services/kb.service';
import { KbLinkedListFacade } from '../linkage/linked-article.facade';

@Injectable()
export class KbViewFacade {

  constructor(private store$: Store<IKbState>,
    private kbSearchFacade: KbSearchFacade,
    private kbSuggestedFacade: KbSuggestedFacade,
    private kbLinkedFacade: KbLinkedListFacade,
    private kbService: KbService,
  ) {
  }

  public openArticle(selectedArticleId: string) {
    return this.store$.dispatch(new OpenArticle(selectedArticleId));
  }

  public isSearching(): Observable<boolean> {
    return this.store$.pipe(select(selectIsContentLoading));
  }

  public setContentLoadSuccess() {
    return this.store$.dispatch(new LoadIFrameContentSuccess());
  }

  public backToSearchPage() {
    return this.store$.dispatch(new BackArticle());
  }

  public getSelectedArticle(id: string): Observable<IArticle> {
    return this.store$.pipe(
      combineLatest(
        this.kbLinkedFacade.getArticles(),
        this.kbSuggestedFacade.getArticles(),
        this.kbSearchFacade.getArticles(),
        (_store, _linkedArticles, _suggestedArticles, _searchedArticles) => {
          const selectedArticleFomLinkage: IArticle | undefined = _linkedArticles ? _linkedArticles.find((item) => item.id == id) : undefined, 
              selectedArticleFromSuggestion: IArticle | undefined = _suggestedArticles ? _suggestedArticles.find((item) => item.id == id) : undefined, 
              selectedArticleFromSearch: IArticle | undefined = _searchedArticles ? _searchedArticles.find((item) => item.id == id) : undefined;
          if (selectedArticleFomLinkage) {
            return selectedArticleFomLinkage;
          } else if(selectedArticleFromSuggestion) {
            return selectedArticleFromSuggestion;
          } else if(selectedArticleFromSearch) {
            return selectedArticleFromSearch;
          } else {
            return this.kbService.getArticle(id); //get article detail info from backend service  
          }
        }
      )
    )
  }

}