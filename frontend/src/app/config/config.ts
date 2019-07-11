
export const AppConfig: any = {
  baseURL: window.location.origin,
  dataAPI: 'data/v4',
  queryAPI: 'query/v1',
  clientIdentifier: 'knowledge-base',
  clientVersion: 'knowledge-base 1.0',
  facadeBaseURL: window.location.origin.indexOf('localhost') > -1? window.location.origin + '/portal/knowledge-base' : window.location.origin + '/knowledge-base/portal/knowledge-base'
};
