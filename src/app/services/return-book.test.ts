import { beforeEach, describe, expect, it } from "bun:test";
import { UsersTestRepository } from "../../test/repositories/users-test-repository";
import { PhysicalBooksTestRepository } from "../../test/repositories/physical-books-test-repository";
import { ReturnBook } from "./return-book";
import { User } from "../entity/user";
import { PhysicalBook } from "../entity/physical-book";

describe("Return book tests", () => {
  let usersRepository = new UsersTestRepository();
  let physicalBooksRepository = new PhysicalBooksTestRepository();
  let returnBook = new ReturnBook(physicalBooksRepository, usersRepository);
  beforeEach(async () => {
    usersRepository = new UsersTestRepository();
    physicalBooksRepository = new PhysicalBooksTestRepository();
    returnBook = new ReturnBook(physicalBooksRepository, usersRepository);
  });
  it("Should return the book", async () => {
    await usersRepository.create(
      new User("aaaa", "John Doe", "john.doe@email.com", "aaaa")
    );
    const targetPhysicalBook = new PhysicalBook("aaaa", "bbbb");
    targetPhysicalBook.borrow("aaaa");
    await physicalBooksRepository.create(targetPhysicalBook);

    expect(returnBook.execute("aaaa", "aaaa")).resolves;
  });
  it("Should not return the book since borrower is not the same as user", async () => {
    await usersRepository.create(
      new User("aaaa", "John Doe", "john.doe@email.com", "aaaa")
    );
    const targetPhysicalBook = new PhysicalBook("aaaa", "bbbb");
    targetPhysicalBook.borrow("cccc");
    await physicalBooksRepository.create(targetPhysicalBook);

    expect(returnBook.execute("aaaa", "aaaa")).rejects.toThrow();
  });
  it("Should not return the book since the book is not borrowed", async () => {
    await usersRepository.create(
      new User("aaaa", "John Doe", "john.doe@email.com", "aaaa")
    );
    const targetPhysicalBook = new PhysicalBook("aaaa", "bbbb");
    await physicalBooksRepository.create(targetPhysicalBook);

    expect(returnBook.execute("aaaa", "aaaa")).rejects.toThrow();
  });
  it("Should not return the book since the user does not exist", async () => {
    const targetPhysicalBook = new PhysicalBook("aaaa", "bbbb");
    targetPhysicalBook.borrow("aaaa");
    await physicalBooksRepository.create(targetPhysicalBook);

    expect(returnBook.execute("aaaa", "aaaa")).rejects.toThrow();
  });
  it("Should not return the book since the book does not exist", async () => {
    await usersRepository.create(
      new User("aaaa", "John Doe", "john.doe@email.com", "aaaa")
    );

    expect(returnBook.execute("aaaa", "aaaa")).rejects.toThrow();
  });
});
