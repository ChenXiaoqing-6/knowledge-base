import { Routes } from '@angular/router';
import { KbSearchComponent } from '../components/kb-search/kb-search.component';
import { KbDetailComponent } from '../components/kb-detail/kb-detail.component';
import { EnsureAuthContextGuard } from '../guards/ensure-auth-context.guard';
const appRoutes: Routes = [
  {
    path: 'article/:id',
    canActivate: [EnsureAuthContextGuard],
    component: KbDetailComponent
  },
  {
    path: '',
    canActivate: [EnsureAuthContextGuard],
    component: KbSearchComponent
  }
];

export {
  appRoutes
};
