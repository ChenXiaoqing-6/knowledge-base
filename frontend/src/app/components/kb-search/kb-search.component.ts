import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { KbSearchFacade } from '../../state/search/search-article.facade';

@Component({
  selector: 'app-kb-search',
  templateUrl: './kb-search.component.html',
  styleUrls: ['./kb-search.component.css']
})
export class KbSearchComponent implements OnInit {

  articles$: Observable<IArticle[]>;
  totalCount$: Observable<number>;
  isInit$: Observable<boolean>;
  busy$: Observable<boolean>;
  notFound$: Observable<boolean>;

  constructor(private searchFacade: KbSearchFacade) { }

  ngOnInit() {
    this.articles$ = this.searchFacade.getArticles();
    this.isInit$ = this.searchFacade.isInit();
    this.busy$ = this.searchFacade.isSearching();
    this.totalCount$ = this.searchFacade.getTotalObjectCount();
    this.notFound$ = this.totalCount$.pipe(map(total => total == 0));
  }

  onSearch(searchString: string) {
    if (searchString.trim().length == 0) {
      this.searchFacade.resetSearch();
    } else {
      this.searchFacade.searchArticles({
        pagination: PaginationHelper.create(),
        searchTerm: searchString
      });
    }
  }

}
