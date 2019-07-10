import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { AppComponent } from './app.component';
import { KbSearchComponent } from './components/kb-search/kb-search.component';
import { KbArticleListComponent } from './components/kb-article-list/kb-article-list.component';
import { KbArticleItemComponent } from './components/kb-article-item/kb-article-item.component';

import { KbaDetailComponent } from './components/kba-detail/kba-detail.component';
import { KbaDetailContentComponent } from './components/kba-detail-content/kba-detail-content.component';
import { KbaDetailHeaderComponent } from './components/kba-detail-header/kba-detail-header.component';
import { KbaDetailFooterComponent } from './components/kba-detail-footer/kba-detail-footer.component';
import { SafeUrlPipe } from './pipes/safeUrl';

import { appRoutes } from './router/routes';
import { KbService } from './services/kb.service';

@NgModule({
  declarations: [
    AppComponent,
    KbSearchComponent,
    KbArticleListComponent,
    KbArticleItemComponent,
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
    KbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
