import { Routes } from '@angular/router';
import { KbSearchComponent } from '../components/kb-search/kb-search.component';
import { KbDetailComponent } from '../components/kb-detail/kb-detail.component';
const appRoutes: Routes = [
  {
    path: 'kbDetail/:id',
    component: KbDetailComponent
  },
  {
    path: '',
    component: KbSearchComponent
  }
];

export {
  appRoutes
};
