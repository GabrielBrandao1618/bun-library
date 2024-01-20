import { test, expect } from "bun:test";
import { Author } from "./author";

test("Should create author", () => {
  const exampleAuthor = new Author("aaaa", "John Doe");
  expect(exampleAuthor.id).toBe("aaaa");
  expect(exampleAuthor.name).toBe("John Doe");
});
