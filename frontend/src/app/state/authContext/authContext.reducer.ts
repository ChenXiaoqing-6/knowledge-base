import { State } from './authContext.state';
import { ActionTypes, Actions } from './authContext.actions';
import { IAuthContext } from './IAuthContext';

export const defaultState: State = {
  authToken: undefined,
  cloudHost: undefined,
  account: undefined,
  accountId: undefined,
  user: undefined,
  userId: undefined,
  company: undefined,
  companyId: undefined
};

export function reducer(state: State = defaultState, { type, payload }: Actions): State {

  switch (type) {
    case ActionTypes.AuthContextLoaded:
      const ctx = payload as IAuthContext;
      return Object.assign({}, state, ctx);
    default:
      return state;
  }

}
