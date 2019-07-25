import { KbContainerComponent } from './../components/kb-container/kb-container.component';
import { Routes } from '@angular/router';
import { KbSearchComponent } from '../components/kb-search/kb-search.component';
import { KbDetailComponent } from '../components/kb-detail/kb-detail.component';
const appRoutes: Routes = [
  {
    path: 'kbDetail',
    component: KbDetailComponent
  },
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
