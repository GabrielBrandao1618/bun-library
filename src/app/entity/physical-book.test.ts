import { expect, test } from "bun:test";
import { PhysicalBook } from "./physical-book";

test("Should create physical book and correctly borrow and return it", () => {
  const book = new PhysicalBook("aaaa", "bbbb");
  expect(book.isAvailable()).toBe(true);
  book.borrow("llll");
  expect(book.isAvailable()).toBe(false);
  expect(book.borrowedBy).toBe("llll");
  expect(() => book.borrow("uuuu")).toThrow();
  book.return();
  expect(book.isAvailable()).toBe(true);
});
