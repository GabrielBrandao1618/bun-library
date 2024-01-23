import { beforeEach, describe, expect, it } from "bun:test";
import { UsersTestRepository } from "../../test/repositories/users-test-repository";
import { PasswordHashingTestStrategy } from "../../test/strategy/password-hashing-test-strategy";
import { AuthTokenTestStrategy } from "../../test/strategy/auth-token-test-strategy";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

describe("Sign-in tests", () => {
  let usersRepository = new UsersTestRepository();
  let passwordHasingStrategy = new PasswordHashingTestStrategy();
  let authTokenStrategy = new AuthTokenTestStrategy();
  let signIn = new SignIn(
    usersRepository,
    authTokenStrategy,
    passwordHasingStrategy
  );

  beforeEach(async () => {
    usersRepository = new UsersTestRepository();
    passwordHasingStrategy = new PasswordHashingTestStrategy();
    authTokenStrategy = new AuthTokenTestStrategy();
    signIn = new SignIn(
      usersRepository,
      authTokenStrategy,
      passwordHasingStrategy
    );
  });
  it("Should sign-in", async () => {
    const signUp = new SignUp(usersRepository, passwordHasingStrategy);
    const userPassword = "password123";
    const user = await signUp.execute(
      "John Doe",
      "email@email.com",
      userPassword
    );
    expect(signIn.execute(user.email, userPassword)).resolves;
  });
  it("Should not sign-in since password is incorrect", async () => {
    const signUp = new SignUp(usersRepository, passwordHasingStrategy);
    const userPassword = "password123";
    const user = await signUp.execute(
      "John Doe",
      "email@email.com",
      userPassword
    );
    expect(signIn.execute(user.email, "otherPassword")).rejects.toThrow();
  });
  it("Should not sign-in since user doesn't exist", async () => {
    expect(signIn.execute("email@email.com", "password123")).rejects.toThrow();
  });
});
