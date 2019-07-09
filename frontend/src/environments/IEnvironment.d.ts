export interface IEnvironment {
  production: boolean;
  clientIdentifier: string;
  clientSecret: string;
  version: string;
  baseUrl: string;
  iFrameOriginUrl: string;
  cloudHostOverWrite: string | null;
}
