import { beforeEach, describe, expect, it } from "bun:test";
import { PhysicalBooksTestRepository } from "../../test/repositories/physical-books-test-repository";
import { UsersTestRepository } from "../../test/repositories/users-test-repository";
import { BorrowBook } from "./borrow-book";
import { PhysicalBook } from "../entity/physical-book";
import { User } from "../entity/user";

describe("Borrow book tests", () => {
  let physicalBooksRepository = new PhysicalBooksTestRepository();
  let usersRepository = new UsersTestRepository();
  let borrowBook = new BorrowBook(physicalBooksRepository, usersRepository);
  beforeEach(async () => {
    physicalBooksRepository = new PhysicalBooksTestRepository();
    usersRepository = new UsersTestRepository();
    borrowBook = new BorrowBook(physicalBooksRepository, usersRepository);
  });
  it("Should fail to borrow the book", async () => {
    expect(borrowBook.execute("aaaa", "bbbb")).rejects.toThrow();
  });
  it("Should successfully borrow the book", async () => {
    await physicalBooksRepository.create(new PhysicalBook("aaaa", "bbbb"));
    await usersRepository.create(
      new User("uuuu", "John Doe", "email@email.com", "pppp")
    );
    const result = await borrowBook.execute("aaaa", "uuuu");
    expect(result.isAvailable()).toBeFalse();
  });
});
