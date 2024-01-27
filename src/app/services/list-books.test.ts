import { it, expect } from "bun:test";
import { BooksTestRepository } from "../../test/repositories/books-test-repository";
import { Book } from "../entity/book";
import { ListBooks } from "./list-books";

it("Should list all books", async () => {
  const booksRepository = new BooksTestRepository();
  const listBooks = new ListBooks(booksRepository);
  await Promise.all([
    booksRepository.create(new Book("aaaa", "A book", "bbbb", 54)),
    booksRepository.create(new Book("bbbb", "A book 2", "bbbb", 60)),
    booksRepository.create(new Book("cccc", "A book 3", "bbbb", 50)),
  ]);

  const books = await listBooks.execute();
  expect(books).toHaveLength(3);
});
