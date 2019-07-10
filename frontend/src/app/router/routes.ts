import { Routes } from '@angular/router';
import { KbSearchComponent } from '../components/kb-search/kb-search.component';

const appRoutes: Routes = [
  {
    path: '',
    component: KbSearchComponent
  },
  {
    path: '**',
    component: KbSearchComponent
  }
];

export {
  appRoutes
};
