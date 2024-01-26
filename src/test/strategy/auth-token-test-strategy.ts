import { sign, verify } from "jsonwebtoken";

import { AuthTokenStrategy } from "../../app/strategy/auth-token-strategy";
import { AuthTokenPayload } from "../../app/types/auth-token-payload";

const secretKey = "ssshhh";

export class AuthTokenTestStrategy implements AuthTokenStrategy {
  async sign(payload: AuthTokenPayload): Promise<string> {
    const token = sign(payload, secretKey);
    return token;
  }
  async verify(token: string): Promise<AuthTokenPayload> {
    const payload = verify(token, secretKey);
    return payload as AuthTokenPayload;
  }
}
