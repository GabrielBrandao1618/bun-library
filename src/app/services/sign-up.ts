import { randomUUID } from "crypto";

import { UsersRepository } from "../repository/users-repository";
import { PasswordHashingStrategy } from "../strategy/password-hashing-strategy";
import { User } from "../entity/user";

export class SignUp {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordHasingStrategy: PasswordHashingStrategy
  ) {}
  async execute(name: string, email: string, password: string) {
    const sameEmailUser = await this.usersRepository.findByEmail(email);
    if (sameEmailUser !== null) {
      throw new Error("Could not create user: duplicated email");
    }
    const passwordHash = await this.passwordHasingStrategy.hash(password);
    const userId = randomUUID();
    const newUser = new User(userId, name, email, passwordHash);
    await this.usersRepository.create(newUser);
    return newUser;
  }
}
