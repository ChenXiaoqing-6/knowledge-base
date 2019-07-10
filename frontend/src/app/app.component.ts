import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../assets/styles/globals.scss']
})
export class AppComponent implements OnInit {

  public routeAndTeamLoading$: Observable<boolean>;
  constructor() {
    // block
  }

  public ngOnInit() {

  }

}
