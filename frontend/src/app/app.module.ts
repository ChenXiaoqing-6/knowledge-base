import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { AppComponent } from './app.component';
import { KbaSearchComponent } from './components/kba-search/kba-search.component';
import { KbaListComponent } from './components/kba-list/kba-list.component';
import { KbaListItemComponent } from './components/kba-list-item/kba-list-item.component';

import { KbaDetailComponent } from './components/kba-detail/kba-detail.component';
import { KbaDetailContentComponent } from './components/kba-detail-content/kba-detail-content.component';
import { KbaDetailHeaderComponent } from './components/kba-detail-header/kba-detail-header.component';
import { KbaDetailFooterComponent } from './components/kba-detail-footer/kba-detail-footer.component';
import { SafeUrlPipe } from './pipes/safeUrl';

import { appRoutes } from './router/routes';
import { KbaService } from './services/kba.service';

@NgModule({
  declarations: [
    AppComponent,
    KbaSearchComponent,
    KbaListComponent,
    KbaListItemComponent,
    KbaDetailComponent,
    KbaDetailContentComponent,
    KbaDetailFooterComponent,
    KbaDetailHeaderComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FundamentalNgxModule,
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true
        // enableTracing: true  <-- debugging purposes only
      })
  ],
  providers: [
    KbaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
