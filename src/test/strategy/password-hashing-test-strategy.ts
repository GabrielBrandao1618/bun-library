import { hash } from "bcrypt";

import { PasswordHashingStrategy } from "../../app/strategy/password-hashing-strategy";

export class PasswordHashingTestStrategy implements PasswordHashingStrategy {
  async hash(password: string): Promise<string> {
    const hashed = await hash(password, 10);
    return hashed;
  }
}
