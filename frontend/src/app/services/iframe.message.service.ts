import { Injectable } from '@angular/core';
import { ShellSdk } from 'fsm-shell';
import { fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IAuthContext } from '../state/authContext/IAuthContext';

export enum EventType {
  KB_INIT = 'KB_INIT',
  KB_OPEN_ARTICLE = 'KB_OPEN_ARTICLE',
  CASE_SELECTED = 'CASE_SELECTED',
  GET_ACTIVE_CASE = 'GET_ACTIVE_CASE',

  KB_GET_CONTEXT = 'KB_GET_CONTEXT',
  KB_CONTEXT_CHANGE = 'KB_CONTEXT_CHANGE'
}

@Injectable()
export class IFrameMessageAdapter {

  private shellSdk: ShellSdk;

  constructor() {
    const origin = environment.iFrameOriginUrl;
    this.shellSdk = ShellSdk.init(parent, origin);

    this.shellSdk.on(EventType.CASE_SELECTED, (e) => {
      console.log(`[EventBus] Recieved (${EventType.CASE_SELECTED}):`, e);
      //TODO:
    });
  }

  public openArticleInParent(articleId: string) {
    const payload = {
      url: window.location.origin + "/#/article/" + articleId
    };
    this.shellSdk.emit(EventType.KB_OPEN_ARTICLE, JSON.stringify(payload));
    console.log(`[EventBus] Sent (${EventType.KB_OPEN_ARTICLE}):`, JSON.stringify(payload));
  }

  public getSearchTermFromActiveCase = () => {
    this.shellSdk.emit(EventType.GET_ACTIVE_CASE, {});
    console.log(`[EventBus] Sent (${EventType.GET_ACTIVE_CASE})`);

    return fromEventPattern<string>(
      handler => this.shellSdk.on(EventType.GET_ACTIVE_CASE, handler),
      handler => this.shellSdk.off(EventType.GET_ACTIVE_CASE, handler)
    ).pipe(
      map((ctxJson): string => {
        const caseData = JSON.parse(ctxJson);
        return caseData.subject;
      })
    )
  }

  public getAuthContextFromIframe = () => {
    this.shellSdk.emit(EventType.KB_INIT, {
      clientIdentifier: environment.clientIdentifier,
      cleintSecret: environment.clientSecret
    });

    return fromEventPattern<string>(
      handler => this.shellSdk.on(EventType.KB_INIT, handler),
      handler => this.shellSdk.off(EventType.KB_INIT, handler)
    ).pipe(
      map((ctxJson): IAuthContext => {
        const ctxData: IAuthContext = JSON.parse(ctxJson);
        const ctx: IAuthContext = {
          authToken: ctxData.authToken,
          cloudHost: !environment.production && environment.cloudHostOverWrite
            ? environment.cloudHostOverWrite : ctxData.cloudHost,
          account: ctxData.account,
          user: ctxData.user,
          userId: ctxData.userId,
          company: ctxData.company,
          accountId: ctxData.accountId,
          companyId: ctxData.companyId,
          userAccountFeatureFlagsEnabled: ctxData.userAccountFeatureFlagsEnabled,
          userAccountFeatureFlagsUserId: ctxData.userAccountFeatureFlagsUserId,
          selectedLocale: ctxData.selectedLocale,
          erpUserId: null
        };
        return ctx;
      })
    )
  }

}
