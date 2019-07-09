import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { KbaSearchComponent } from './components/kba-search/kba-search.component';
import { KbaListComponent } from './components/kba-list/kba-list.component';
import { KbaListItemComponent } from './components/kba-list-item/kba-list-item.component';
import { appRoutes } from './router/routes';
import { KbaService } from './services/kba.service';

@NgModule({
  declarations: [
    AppComponent,
    KbaSearchComponent,
    KbaListComponent,
    KbaListItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
