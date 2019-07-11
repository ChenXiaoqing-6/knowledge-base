import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable} from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { IKbSearchState } from '../../state/search/search-article.state';
import { SearchArticles } from '../../state/search/search-article.actions';
import {selectIsLoading, selectAllArticles } from '../../state/search/search-article.selectors';

@Component({
  selector: 'app-kb-search',
  templateUrl: './kb-search.component.html',
  styleUrls: ['./kb-search.component.css']
})
export class KbSearchComponent implements OnInit {
  articles$: Observable<IArticle[]>;
  totalCount$: Observable<number>;
  busy$: Observable<boolean>;

  constructor(private store$: Store<IKbSearchState>) { 
    this.articles$ = this.store$.pipe(select(selectAllArticles));
    this.busy$ = this.store$.pipe(select(selectIsLoading));
  }

  ngOnInit() {
  }

  onSearch(searchString: string) {
    this.store$.dispatch(new SearchArticles({
      pagination: {
        pageIndex: 0,
        pageSize: 20
      },
      searchTerm: "hello"
    }));
  }

}
