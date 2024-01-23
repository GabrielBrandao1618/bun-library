import { UsersRepository } from "../repository/users-repository";
import { AuthTokenStrategy } from "../strategy/auth-token-strategy";
import { PasswordHashingStrategy } from "../strategy/password-hashing-strategy";

export class SignIn {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authTokenStrategy: AuthTokenStrategy,
    private readonly passwordHasingStrategy: PasswordHashingStrategy
  ) {}
  async execute(email: string, password: string) {
    const foundUser = await this.usersRepository.findByEmail(email);
    if (foundUser === null) {
      throw new Error("User not found");
    }
    const isPasswordCorrect = await this.passwordHasingStrategy.compare(
      password,
      foundUser.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Error("User password is incorrect");
    }
    const token = await this.authTokenStrategy.sign({
      id: foundUser.id,
    });
    return token;
  }
}
