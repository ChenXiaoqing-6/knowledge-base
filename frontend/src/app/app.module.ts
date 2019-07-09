import './utilities/rxjs-imports';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { Ng5SliderModule } from 'ng5-slider';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from './state';
import { EnsureAuthContextGuard } from './state/router/guards/ensure-auth-context.guard';
import { EnsureItemGuard } from './state/router/guards/ensure-item.guard';
import { TeamEffects } from './state/team/team.effects';
import { AuthContextEffects } from './state/authContext/authContext.effects';
import { HeaderComponent } from './components/team-header/team-header.component';
import { FooterComponent } from './components/team-footer/team-footer.component';
import { NotFoundComponent } from './containers/not-found/not-found.container';
import { NoPermissionComponent } from './containers/no-permission/no-permission.container';
import { MainContainerComponent } from './containers/main/main.container';
import { appRoutes } from './state/router/routes';
import { CustomRouterStateSerializer } from './state/router/CustomRouterStateSerializer';
import { AuthContextIframeService } from './state/authContext/authContextIframe.service';
import { PermissionsService } from './state/permissions/permissions.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthContextInterceptor } from './state/authContext/authContext.interceptor';
import { DetailsComponent } from './components/team-details/team-details.component';
import { MembersComponent } from './components/team-members/team-members.component';
import { TranslateHttpLoaderFactory } from './state/i18n/TranslateHttpLoaderFactory';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FormatDateTimePipe } from './pipes/format-date-time.pipe';
import { TeamService } from './state/team/team.service';
import { ResourcesService } from './state/resources/resources.service';
import { TeamTimeFramesService } from './state/team-time-frames/team-time-frames.service';
import { AttachmentsService } from './state/attachments/attachments.service';
import { ConfigService } from './state/config/config.service';
import { ErrorHandlingEffects } from './state/error-handling/error-handling.effects';
import { ConfigEffects } from './state/config/config.effects';
import { PermissionsEffects } from './state/permissions/permissions.effects';
import { ResourcesEffects } from './state/resources/resources.effects';
import { TeamTimeFramesEffects } from './state/team-time-frames/team-time-frames.effects';
import { AddToTeamEffects } from './state/addToTeam/add-to-team.effects';
import { LaunchDarklyClientService } from './state/launchDarkly/launch-darkly-client.service';
import { MomentWrapperService } from './state/i18n/moment-wrapper.service';
import { FundamentalNgxModule } from 'fundamental-ngx';
import { SpinnerModule } from '@tsmean/spinner';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamSchedulerComponent } from './components/team-scheduler/team-scheduler.component';
import { DayPilotModule } from 'daypilot-pro-angular';
import { ErrorHandlingComponent } from './components/error-handling/error-handling.component';
import { TeamSchedulerEventsEffects } from './state/team-scheduler-events/team-scheduler-events.effects';
import { TranslateEffects } from './state/i18n/translate.effects';
import { BlockingEventsEffects } from './state/blocking-events/blocking-events.effects';
import { BlockingEventService } from './state/blocking-events/blocking-events.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NavigationEffects } from './state/navigation/navigation.effects';
import { AttachmentEffects } from './state/attachments/attachments.effects';
import { TeamSchedulerActionValidationService } from './state/team-scheduler-events/team-scheduler-action-validation.service';
import { TeamSchedulerValidationRules } from './state/team-scheduler-events/team-scheduler-validation-rules';
import { TeamActivitiesEffects } from './state/team-activities/team-activities.effects';
import { TeamActivitiesService } from './state/team-activities/team-activities.service';

@NgModule({
  entryComponents: [ErrorHandlingComponent, ConfirmationDialogComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    MainContainerComponent,
    ErrorHandlingComponent,
    DetailsComponent,
    MembersComponent,
    NoPermissionComponent,
    CapitalizePipe,
    FormatDateTimePipe,
    TeamSchedulerComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true
        // enableTracing: true  <-- debugging purposes only
      }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([
      TeamEffects,
      AuthContextEffects,
      ConfigEffects,
      ErrorHandlingEffects,
      PermissionsEffects,
      ResourcesEffects,
      TeamTimeFramesEffects,
      AddToTeamEffects,
      TeamSchedulerEventsEffects,
      TranslateEffects,
      BlockingEventsEffects,
      NavigationEffects,
      AttachmentEffects,
      TeamActivitiesEffects
    ]),
    // MaterialModule.forRoot(),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // name of reducer key
    }),
    FundamentalNgxModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule.forRoot({
      primaryColor: '#0a6ed1'
    }),
    DayPilotModule,
    Ng5SliderModule
  ],
  providers: [
    BlockingEventService,
    EnsureItemGuard,
    EnsureAuthContextGuard,
    AuthContextIframeService,
    TeamService,
    ResourcesService,
    TeamTimeFramesService,
    AttachmentsService,
    LaunchDarklyClientService,
    ConfigService,
    MomentWrapperService,
    PermissionsService,
    TeamSchedulerActionValidationService,
    TeamSchedulerValidationRules,
    TeamActivitiesService,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: AuthContextInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
