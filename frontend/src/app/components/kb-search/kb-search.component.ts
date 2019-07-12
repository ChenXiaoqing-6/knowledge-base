import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { IArticle } from '../../models/IArticle';
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

  constructor(private searchFacade: KbSearchFacade) { 
    this.articles$ = this.searchFacade.getArticles();
    this.isInit$ = this.searchFacade.isInit();
    this.busy$ = this.searchFacade.isSearching();
  }

  ngOnInit() {
  }

  onSearch(searchString: string) {
    if (searchString.trim() == '') {
      this.searchFacade.resetSearch();
    } else {
      this.searchFacade.searchArticles({
        pagination: {
          pageIndex: 0,
          pageSize: 20
        },
        searchTerm: searchString
      });
    }
  }

}
