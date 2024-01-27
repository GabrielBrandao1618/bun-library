import { it, expect } from "bun:test";
import { UsersTestRepository } from "../../test/repositories/users-test-repository";
import { ListUsers } from "./list-users";
import { User } from "../entity/user";

it("Should list all users", async () => {
  const usersRepository = new UsersTestRepository();
  const listUsers = new ListUsers(usersRepository);

  await Promise.all([
    usersRepository.create(
      new User("aaaa", "John Doe", "email@email.com", "bbbb")
    ),
    usersRepository.create(
      new User("bbbb", "John Doe Júnior", "email1@email.com", "bbbb")
    ),
    usersRepository.create(
      new User("cccc", "Joana Doe", "email2@email.com", "bbbb")
    ),
  ]);

  const result = await listUsers.execute();
  expect(result).toHaveLength(3);
});
