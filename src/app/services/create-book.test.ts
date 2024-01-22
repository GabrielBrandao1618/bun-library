import { describe, expect, it } from "bun:test";
import { CreateBook } from "./create-book";
import { BooksTestRepository } from "../../test/repositories/books-test-repository";
import { AuthorsTestRepository } from "../../test/repositories/authors-test-repository";
import { Author } from "../entity/author";

describe("Add book tests", () => {
  it("Should create a new book", async () => {
    const booksRepository = new BooksTestRepository();
    const authorsRepository = new AuthorsTestRepository();
    const createBook = new CreateBook(booksRepository, authorsRepository);

    expect(createBook.execute("A book", "aaaa", 54)).rejects.toThrow();
    await authorsRepository.create(new Author("aaaa", "John Doe"));
    expect(createBook.execute("A book", "aaaa", 54)).resolves;
  });
});
