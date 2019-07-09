import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IState } from './state';
import { selectRouteAndTeamLoading } from './state/navigation/navigation.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../assets/styles/globals.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public routeAndTeamLoading$: Observable<boolean>;
  constructor(
    private store: Store<IState>
  ) {
    // block
  }

  public ngOnInit() {
    this.routeAndTeamLoading$ = this.store.pipe(select(selectRouteAndTeamLoading));
  }

}
