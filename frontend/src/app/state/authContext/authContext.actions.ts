import { Action } from '@ngrx/store';
import { ActivatedRouteSnapshot } from '@angular/router';
import { IAuthContext } from './IAuthContext';

export enum ActionTypes {
  AwaitAuthContextLoaded = '[KB-authContext] AwaitAuthContextLoaded',
  AuthContextLoaded = '[KB-authContext] AuthContextLoaded',
  RequireExternalAuthentication = '[KB-authContext] RequireExternalAuthentication',
  RequireInternAuthentication = '[KB-authContext] RequireInternAuthentication',
  CloseIframe = '[KB-authContext] CloseIframe'
}

export type Actions = AwaitAuthContextLoaded | AuthContextLoaded;

export class AwaitAuthContextLoaded implements Action {
  public readonly type = ActionTypes.AwaitAuthContextLoaded;

  constructor(public payload: ActivatedRouteSnapshot) {
  }
}

export class AuthContextLoaded implements Action {
  public readonly type = ActionTypes.AuthContextLoaded;

  constructor(public payload: IAuthContext) {
  }
}

export class RequireInternAuthentication implements Action {
  public readonly type = ActionTypes.RequireInternAuthentication;

  constructor(public payload: ActivatedRouteSnapshot) {
  }
}

export class RequireExternalAuthentication implements Action {
  public readonly type = ActionTypes.RequireExternalAuthentication;

  constructor(public payload: ActivatedRouteSnapshot) {
  }
}

export class CloseIframe<T> implements Action {
  public readonly type = ActionTypes.CloseIframe;
  constructor(public payload: T) {
  }
}
