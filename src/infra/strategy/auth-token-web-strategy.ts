import { sign } from "jsonwebtoken";

import { AuthTokenStrategy } from "../../app/strategy/auth-token-strategy";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? "";

export class AuthTokenWebStrategy implements AuthTokenStrategy {
  async sign(payload: object): Promise<string> {
    const token = sign(payload, JWT_PRIVATE_KEY, { expiresIn: "1d" });
    return token;
  }
}
