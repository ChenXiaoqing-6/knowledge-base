import * as uuidv1 from 'uuid/v1';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { IKbState } from '../index';

import { environment } from '../../../environments/environment';
import { filter, mergeMap, take, takeWhile } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { selectAuthContext } from './authContext.selectors';

export const BYPASS_PARAM = 'bypassAuthContextInterceptor';

@Injectable()
export class AuthContextInterceptor implements HttpInterceptor {
  constructor(private store$: Store<IKbState>) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.params.get(BYPASS_PARAM) === 'true') {
      return next.handle(request.clone({ params: request.params.delete(BYPASS_PARAM) }));
    }

    let isDone = false;
    const waitForContext = this.store$.pipe(
      select(selectAuthContext),
      takeWhile(() => !isDone),
      filter(ctx => !!ctx.authToken),
      take(1)
    ).toPromise().then(ctx => {
      isDone = true;
      return request.clone({
        setHeaders: {
          'Authorization': ctx.authToken as string,
          'X-Cloud-Host': ctx.cloudHost as string,
          'X-Client-ID': environment.clientIdentifier,
          'X-Client-Version': environment.version,
          'X-Request-ID': uuidv1(),
          'X-Cloud-Account-Id': `${ctx.accountId}`,
          'X-Cloud-Account-Name': ctx.account ? encodeURI(ctx.account) : '',
          'X-Cloud-Company-Id': `${ctx.companyId}`,
          'X-Cloud-Company-Name': ctx.company ? encodeURI(ctx.company) : '',
          'X-Cloud-User-Id': `${ctx.userId}`,
          'X-Cloud-User-Name': ctx.user ? encodeURI(ctx.user) : ''
        }
      });
    });

    return fromPromise(waitForContext).pipe(
      mergeMap(it => next.handle(it)));
  }
}
