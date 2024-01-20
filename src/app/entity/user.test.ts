import { expect, test } from "bun:test";
import { User } from "./user";

test("Should create user", () => {
  const user = new User("aaaa", "John Doe", "email@email.com", "abababab");
  expect(user.name).toBe("John Doe");
});
