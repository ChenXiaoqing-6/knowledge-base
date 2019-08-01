import {InjectionToken} from '@angular/core';

export const APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  baseURL: window.location.origin,
  dataAPI: 'data/v4',
  queryAPI: 'query/v1',
  clientIdentifier: 'knowledgebase',
  clientVersion: 'knowledgebase 1.0',
  facadeBaseURL: window.location.origin.indexOf('10.130.228.190') > -1 ? window.location.origin + '/portal/knowledgebase' : window.location.origin + '/knowledgebase/portal/knowledgebase'
};
