/** Organisation password policy */
export interface PasswordParameters {
  /** Password rotation policy is active */
  enabled: boolean;
  /** Required password change interval in days */
  changeFrequency?: number;
}
