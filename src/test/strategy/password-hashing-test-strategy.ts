import { hash, genSalt, compare } from "bcrypt";

import { PasswordHashingStrategy } from "../../app/strategy/password-hashing-strategy";

export class PasswordHashingTestStrategy implements PasswordHashingStrategy {
  async hash(password: string): Promise<string> {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed;
  }
  async compare(password: string, hashed: string) {
    return await compare(password, hashed);
  }
}
