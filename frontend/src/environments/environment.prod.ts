import { IEnvironment } from './IEnvironment';
import { appConfigJson } from './auto-generated-appconfig'; // file generated before build

export const environment: IEnvironment = {
  production: true,
  clientIdentifier: appConfigJson.appConfig.clientIdentifier,
  clientSecret: appConfigJson.appConfig.clientSecret,
  version: appConfigJson.appConfig.version,
  baseUrl: 'portal',
  iFrameOriginUrl: location.origin, // self => only allow access from same TLD
  cloudHostOverWrite: null
};
