import { AuthTokenStrategy } from "../strategy/auth-token-strategy";

export class VerifySignIn {
  constructor(private readonly authTokenStrategy: AuthTokenStrategy) {}
  async execute(token: string) {
    const payload = await this.authTokenStrategy.verify(token);
    return payload;
  }
}
