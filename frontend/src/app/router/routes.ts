import { Routes } from '@angular/router';
import { KbSearchComponent } from '../components/kb-search/kb-search.component';
import { KbDetailComponent } from '../components/kb-detail/kb-detail.component';
import { KbConfigComponent } from '../components/kb-config/config.component';
import { KbConfigFormComponent } from '../components/kb-config-form/kb-config-form.component';
//import { EnsureAuthContextGuard } from '../guards/ensure-auth-context.guard';
const appRoutes: Routes = [
  {
    path: 'article/:id',
 //   canActivate: [EnsureAuthContextGuard],
    component: KbDetailComponent
  },
  {
    path: '',
   // canActivate: [EnsureAuthContextGuard],
    component: KbSearchComponent
  },
  {
    path: 'configure',
   // canActivate: [EnsureAuthContextGuard],
    component: KbConfigComponent
  },
  {
    path: 'configure/form',
   // canActivate: [EnsureAuthContextGuard],
    component: KbConfigFormComponent
  }
];

export {
  appRoutes
};
