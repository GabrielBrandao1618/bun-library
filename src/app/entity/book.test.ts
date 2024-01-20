import { test, expect } from "bun:test";
import { Book } from "./book";

test("Should create book", () => {
  const book = new Book("aaaa", "A book", "bbbb", 87);
  expect(book.authorId).toBe("bbbb");
});
