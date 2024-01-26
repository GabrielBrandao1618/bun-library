import { describe, it, expect, beforeEach } from "bun:test";
import { UsersTestRepository } from "../../test/repositories/users-test-repository";
import { AuthTokenTestStrategy } from "../../test/strategy/auth-token-test-strategy";
import { SignIn } from "./sign-in";
import { PasswordHashingTestStrategy } from "../../test/strategy/password-hashing-test-strategy";
import { VerifySignIn } from "./verify-sign-in";
import { User } from "../entity/user";
import { SignUp } from "./sign-up";

describe("Verify sign-in tests", () => {
  let usersRepository = new UsersTestRepository();
  let authTokenStrategy = new AuthTokenTestStrategy();
  let passwordHashingStrategy = new PasswordHashingTestStrategy();
  let signIn = new SignIn(
    usersRepository,
    authTokenStrategy,
    passwordHashingStrategy
  );
  let signUp = new SignUp(usersRepository, passwordHashingStrategy);
  let verifySignIn = new VerifySignIn(authTokenStrategy);
  beforeEach(async () => {
    usersRepository = new UsersTestRepository();
    authTokenStrategy = new AuthTokenTestStrategy();
    passwordHashingStrategy = new PasswordHashingTestStrategy();
    signIn = new SignIn(
      usersRepository,
      authTokenStrategy,
      passwordHashingStrategy
    );
    signUp = new SignUp(usersRepository, passwordHashingStrategy);
    verifySignIn = new VerifySignIn(authTokenStrategy);
  });
  it("Should verify sign-in and return the payload correctly", async () => {
    const user = await signUp.execute("John Doe", "email@email.com", "secret");

    const token = await signIn.execute("email@email.com", "secret");

    const payload = await verifySignIn.execute(token);
    expect(payload.id).toBe(user.id);
  });
});
