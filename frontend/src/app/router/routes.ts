import { KbContainerComponent } from './../components/kb-container/kb-container.component';
import { Routes } from '@angular/router';
import { KbSearchComponent } from '../components/kb-search/kb-search.component';
const appRoutes: Routes = [
  {
    path: '',
    component: KbContainerComponent
  },
  {
    path: '**',
    component: KbSearchComponent
  }
];

export {
  appRoutes
};
