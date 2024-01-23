import { sign } from "jsonwebtoken";

import { AuthTokenStrategy } from "../../app/strategy/auth-token-strategy";

export class AuthTokenTestStrategy implements AuthTokenStrategy {
  async sign(payload: object): Promise<string> {
    const token = sign(payload, "sshhhh");
    return token;
  }
}
