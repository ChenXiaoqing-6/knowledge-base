import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IKbState } from '../state/index';
import { AwaitAuthContextLoaded } from '../state/authContext/authContext.actions';
import { filter, map, take } from 'rxjs/operators';
import { selectAuthContext } from '../state/authContext/authContext.selectors';


@Injectable()
export class EnsureAuthContextGuard implements CanActivate {

  constructor(private store: Store<IKbState>) {
  }

  public canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isLoaded$ = this.store.pipe(
      select(selectAuthContext),
      map(ctx => !!ctx && !!ctx.authToken)
    );

    // // request the ctx if no token
    isLoaded$.pipe(
      take(1),
      filter(loaded => !loaded),
      map(() => new AwaitAuthContextLoaded(next))
    ).subscribe(this.store);

    // will yield until sees authToken
    return isLoaded$.pipe(filter(hasToken => hasToken));
  }
}
