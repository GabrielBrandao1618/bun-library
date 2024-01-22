import { describe, expect, it } from "bun:test";
import { BooksTestRepository } from "../../test/repositories/books-test-repository";
import { PhysicalBooksTestRepository } from "../../test/repositories/physical-books-test-repository";
import { CreatePhysicalBook } from "./create-physical-book";
import { Book } from "../entity/book";

describe("Create physical book tests", () => {
  it("Should create a physical book", async () => {
    const booksRepository = new BooksTestRepository();
    const physicalBooksRepository = new PhysicalBooksTestRepository();
    const createPhysicalBook = new CreatePhysicalBook(
      physicalBooksRepository,
      booksRepository
    );

    await booksRepository.create(new Book("aaaa", "A book", "aaaa", 65));
    const result = await createPhysicalBook.execute("aaaa");
    expect(result.bookId).toBe("aaaa");
  });
  it("Should not create a physical book since book does not exist", async () => {
    const booksRepository = new BooksTestRepository();
    const physicalBooksRepository = new PhysicalBooksTestRepository();
    const createPhysicalBook = new CreatePhysicalBook(
      physicalBooksRepository,
      booksRepository
    );

    expect(createPhysicalBook.execute("aaaa")).rejects.toThrow();
  });
});
