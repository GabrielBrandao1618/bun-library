import { sign, verify } from "jsonwebtoken";

import { AuthTokenStrategy } from "../../app/strategy/auth-token-strategy";
import { AuthTokenPayload } from "../../app/types/auth-token-payload";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? "";

export class AuthTokenWebStrategy implements AuthTokenStrategy {
  async sign(payload: AuthTokenPayload): Promise<string> {
    const token = sign(payload, JWT_PRIVATE_KEY, { expiresIn: "1d" });
    return token;
  }
  async verify(token: string): Promise<AuthTokenPayload> {
    const payload = verify(token, JWT_PRIVATE_KEY);
    return payload as AuthTokenPayload;
  }
}
