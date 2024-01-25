import { PasswordHashingStrategy } from "../../app/strategy/password-hashing-strategy";

export class PasswordHashingTestStrategy implements PasswordHashingStrategy {
  async hash(password: string): Promise<string> {
    const hashed = await Bun.password.hash(password, {
      cost: 4,
      algorithm: "bcrypt",
    });
    return hashed;
  }
  async compare(password: string, hashed: string) {
    return await Bun.password.verify(password, hashed);
  }
}
