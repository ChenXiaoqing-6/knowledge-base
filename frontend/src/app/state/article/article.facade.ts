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
        this.kbSuggestedFacade.getSelectedArticle(id),
        this.kbSearchFacade.getSelectedArticle(id),
        this.kbLinkedFacade.getSelectedArticle(id),
        (_store, _suggestedArticle, _searchedArticle, _linkedArticle) => {
          if(_suggestedArticle !== undefined) {
            return _suggestedArticle;
          } else if(_searchedArticle !== undefined) {
            return _searchedArticle;
          } else if(_linkedArticle !== undefined) {
            return _linkedArticle;
          } else {
            return this.kbService.getArticle(id); //get article detail info from backend service  
          }
        }
      )
    );
  } 
  
}