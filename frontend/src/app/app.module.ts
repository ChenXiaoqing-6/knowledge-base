import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { storeFreeze } from 'ngrx-store-freeze';
import { RouterModule } from '@angular/router';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { AppComponent } from './app.component';
import { KbSearchComponent } from './components/kb-search/kb-search.component';
import { KbArticleListComponent } from './components/kb-article-list/kb-article-list.component';
import { KbArticleItemComponent } from './components/kb-article-item/kb-article-item.component';

import { KbDetailComponent } from './components/kb-detail/kb-detail.component';
import { KbDetailContentComponent } from './components/kb-detail-content/kb-detail-content.component';
import { KbDetailHeaderComponent } from './components/kb-detail-header/kb-detail-header.component';
import { KbDetailFooterComponent } from './components/kb-detail-footer/kb-detail-footer.component';
import { SafeUrlPipe } from './pipes/safeUrl';
import { KbDetailTestComponent } from './components/kb-detail-test/kb-detail-test.component';

import { IKbState, effects, reducers } from './state';
import { appRoutes } from './router/routes';
import { KbService } from './services/kb.service';

export const metaReducers: MetaReducer<IKbState>[] = [storeFreeze];

@NgModule({
  declarations: [
    AppComponent,
    KbSearchComponent,
    KbArticleListComponent,
    KbArticleItemComponent,
    KbDetailComponent,
    KbDetailContentComponent,
    KbDetailFooterComponent,
    KbDetailHeaderComponent,
    SafeUrlPipe,
    KbDetailTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FundamentalNgxModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot(effects),
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
  bootstrap: [AppComponent],
  entryComponents: [
    KbDetailComponent
  ]
})
export class AppModule { }
