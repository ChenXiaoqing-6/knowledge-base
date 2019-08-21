import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { KbSearchComponent } from './components/kb-search/kb-search.component';
import { KbArticleListComponent } from './components/kb-article-list/kb-article-list.component';
import { KbArticleItemComponent } from './components/kb-article-item/kb-article-item.component';

import { KbDetailComponent } from './components/kb-detail/kb-detail.component';
import { KbDetailContentComponent } from './components/kb-detail-content/kb-detail-content.component';
import { KbDetailHeaderComponent } from './components/kb-detail-header/kb-detail-header.component';
import { KbDetailFooterComponent } from './components/kb-detail-footer/kb-detail-footer.component';
import { SafeUrlPipe } from './pipes/safeUrl.pipe';
import { KbLinkedListComponent } from './components/kb-linked-list/kb-linked-list.component';
import { KbSuggestedListComponent } from './components/kb-suggested-list/kb-suggested-list.component';
import { KbArticleActionsComponent } from './components/kb-article-actions/kb-article-actions.component';

import { effects, reducers, metaReducers } from './state';
import { appRoutes } from './router/routes';
import { CloudService } from './services/cloud.service';
import { KbService } from './services/kb.service';
import { KbActionService } from './services/kbAction.service';
import { KbSearchFacade } from './state/search/search-article.facade';
import { KbViewFacade } from './state/article/article.facade';
import { KbLinkedListFacade } from './state/linkage/linked-article.facade';
import { KbSuggestedFacade } from './state/suggestion/suggested-article.facade';

import { IFrameMessageAdapter } from './services/iframe.message.service';
import { EnsureAuthContextGuard } from './guards/ensure-auth-context.guard';
import { AuthContextInterceptor } from './state/authContext/authContext.interceptor';
import { TranslationService } from './services/translation.service';
import { KbConfigComponent } from './components/kb-config/config.component';
import { KbConfigFormComponent } from './components/kb-config-form/kb-config-form.component';



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
    KbLinkedListComponent,
    KbSuggestedListComponent,
    KbArticleActionsComponent,
    KbConfigComponent,
    KbConfigFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FundamentalNgxModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
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
    KbSearchFacade,
    TranslationService,
    KbViewFacade,
    KbLinkedListFacade,
    KbSuggestedFacade,
    CloudService,
    KbService,
    KbActionService,
    EnsureAuthContextGuard,
    IFrameMessageAdapter,
    {provide: HTTP_INTERCEPTORS, useClass: AuthContextInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
