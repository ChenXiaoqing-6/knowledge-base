
export interface IAuthContext {
  cloudHost: string | null;
  authToken: string | null;
  accountId: string | null;
  account: string | null;
  user: string | null;
  userId: string | null;
  userAccountFeatureFlagsEnabled: boolean | null;
  userAccountFeatureFlagsUserId: string | null;
  company: string | null;
  companyId: string | null;
  selectedLocale: string | null;
  erpUserId: string | null;
}
