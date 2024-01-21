import { describe, it, beforeEach, expect } from "bun:test";
import { UsersRepository } from "../repository/users-repository";
import { UsersTestRepository } from "../../test/repositories/users-test-repository";
import { PasswordHashingStrategy } from "../strategy/password-hashing-strategy";
import { PasswordHashingTestStrategy } from "../../test/strategy/password-hashing-test-strategy";
import { SignUp } from "./sign-up";
import { User } from "../entity/user";

describe("Sign-up tests", () => {
  let usersRepository: UsersRepository = new UsersTestRepository();
  let passwordHasingStrategy: PasswordHashingStrategy =
    new PasswordHashingTestStrategy();
  let signUp = new SignUp(usersRepository, passwordHasingStrategy);
  beforeEach(async () => {
    usersRepository = new UsersTestRepository();
    passwordHasingStrategy = new PasswordHashingTestStrategy();
    signUp = new SignUp(usersRepository, passwordHasingStrategy);
  });
  it("Should sign-up", async () => {
    expect(signUp.execute("John Doe", "email@email.com", "password123"))
      .resolves;
  });
  it("Should not sign-up as email is duplicated", async () => {
    await usersRepository.create(
      new User("aaaa", "John Doe", "email@email.com", "bbbb")
    );
    expect(
      signUp.execute("John Doe", "email@email.com", "password123")
    ).rejects.toThrow();
  });
});
