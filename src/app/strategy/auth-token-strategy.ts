import { AuthTokenPayload } from "../types/auth-token-payload";

export interface AuthTokenStrategy {
  sign(payload: AuthTokenPayload): Promise<string>;
  verify(token: string): Promise<AuthTokenPayload>;
}
