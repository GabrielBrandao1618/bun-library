import { describe, expect, it } from "bun:test";
import { AddBook } from "./add-book";
import { BooksTestRepository } from "../../test/repositories/books-test-repository";
import { AuthorsTestRepository } from "../../test/repositories/authors-test-repository";
import { Author } from "../entity/author";

describe("Add book tests", () => {
  it("Should create a new book", async () => {
    const booksRepository = new BooksTestRepository();
    const authorsRepository = new AuthorsTestRepository();
    const addBook = new AddBook(booksRepository, authorsRepository);

    expect(addBook.execute("A book", "aaaa", 54)).rejects.toThrow();
    await authorsRepository.create(new Author("aaaa", "John Doe"));
    expect(addBook.execute("A book", "aaaa", 54)).resolves;
  });
});
