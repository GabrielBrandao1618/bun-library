import { type PasswordHashingStrategy } from "../../app/strategy/password-hashing-strategy";

const passwordHashingCost = Number(process.env.PASSWORD_HASHING_COST ?? "5");

export class PasswordHashingWebStrategy implements PasswordHashingStrategy {
  async hash(password: string): Promise<string> {
    const hashed = await Bun.password.hash(password, {
      cost: passwordHashingCost,
      algorithm: "bcrypt",
    });
    return hashed;
  }
  async compare(password: string, hashed: string): Promise<boolean> {
    return await Bun.password.verify(password, hashed);
  }
}
