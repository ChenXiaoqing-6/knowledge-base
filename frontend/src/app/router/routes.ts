import { Routes } from '@angular/router';
import { KbaSearchComponent } from '../components/kba-search/kba-search.component';

const appRoutes: Routes = [
  {
    path: '',
    component: KbaSearchComponent
  },
  {
    path: '**',
    component: KbaSearchComponent
  }
];

export {
  appRoutes
};
