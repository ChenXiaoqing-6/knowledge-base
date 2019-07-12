import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { IKbState } from '../index';
import { OpenArticle, LoadIFrameContentSuccess } from './article.actions';
import { selectIsContentLoading } from './article.selectors';

@Injectable()
export class KbViewFacade {
 
  constructor(private store$: Store<IKbState>) {
  }

  public openArticle(article: IArticle) {
    return this.store$.dispatch(new OpenArticle(article));
  }

  public isSearching(): Observable<boolean> {
    return this.store$.pipe(select(selectIsContentLoading));
  }

  public setContentLoadSuccess() {
      return this.store$.dispatch(new LoadIFrameContentSuccess());
  }
 
}