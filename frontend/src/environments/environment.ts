import { IEnvironment } from './IEnvironment';
import { appConfigJson } from './auto-generated-appconfig'; // file generated before build

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: IEnvironment = {
  production: false,
  clientIdentifier: appConfigJson.appConfig.clientIdentifier,
  clientSecret: appConfigJson.appConfig.clientSecret,
  version: appConfigJson.appConfig.version,
  baseUrl: 'http://10.130.228.190:8001/portal',
  iFrameOriginUrl: 'http://10.130.228.190:3001', // WFM => 'http://localhost:3000' put here the host of the app opening the frame
  cloudHostOverWrite: null // When running WFM locally '{env}.dev.coresuite.com'
};
