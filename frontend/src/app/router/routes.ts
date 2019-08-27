import { Routes } from '@angular/router';
import { KbSearchComponent } from '../components/kb-search/kb-search.component';
import { KbDetailComponent } from '../components/kb-detail/kb-detail.component';
import { KbConfigComponent } from '../components/kb-config/config.component';

const appRoutes: Routes = [
  {
    path: 'kbDetail/:id',
    component: KbDetailComponent
  },
  {
    path: '',
    component: KbSearchComponent
  },
  {
    path: 'setting',
    component: KbConfigComponent
  }
];

export {
  appRoutes
};
