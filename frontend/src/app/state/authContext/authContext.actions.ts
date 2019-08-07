import { ActivatedRouteSnapshot } from '@angular/router';
import { Action } from '@ngrx/store';
import { IAuthContext } from './IAuthContext';

export enum ActionTypes {
  AwaitAuthContextLoaded = '[KB-authContext] AwaitAuthContextLoaded',
  RequireAuthentication = '[KB-authContext] RequireAuthentication',
  AuthContextLoaded = '[KB-authContext] AuthContextLoaded'
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

export class RequireAuthentication implements Action {
  public readonly type = ActionTypes.RequireAuthentication;

  constructor(public payload: ActivatedRouteSnapshot) {
  }
}

