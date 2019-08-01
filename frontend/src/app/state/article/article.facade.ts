import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { combineLatest, } from 'rxjs/operators';
import { IKbState } from '../index';
import { OpenArticle, BackArticle, LoadIFrameContentSuccess } from './article.actions';
import { selectIsContentLoading } from './article.selectors';
import { KbSearchFacade } from '../search/search-article.facade';
import { KbSuggestedFacade } from '../suggestedList/suggested-article.facade';
import { IArticle } from '../../models/IArticle';
import { KbService } from '../../services/kb.service';

@Injectable()
export class KbViewFacade {

  constructor(private store$: Store<IKbState>, 
    private kbSearchFacade: KbSearchFacade, 
    private kbSuggestedFacade: KbSuggestedFacade,
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
        this.kbSuggestedFacade.getSelectedArticleById(id),
        this.kbSearchFacade.getSelectedArticleById(id),
        (_store, _suggestedArticle, _searchedArticle) => {
          if(_suggestedArticle !== undefined) {
            return _suggestedArticle;
          } else if(_searchedArticle !== undefined) {
            return _searchedArticle;
          } else {
            return this.kbService.getArticle(id); //get article detailed info from backend service  
          }
        }
      )
    );
  } 
  
}