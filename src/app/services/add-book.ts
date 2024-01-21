import { randomUUID } from "crypto";

import { AuthorsRepository } from "../repository/authors-repository";
import { BooksRepository } from "../repository/books-repository";
import { Book } from "../entity/book";

export class AddBook {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly authorsRepository: AuthorsRepository
  ) {}
  async execute(title: string, authorId: string, numPages: number) {
    const foundAuthor = await this.authorsRepository.findById(authorId);
    if (foundAuthor === null) {
      throw new Error("Author not found");
    }
    const bookId = randomUUID();
    const newBook = new Book(bookId, title, authorId, numPages);
    await this.booksRepository.create(newBook);
    return newBook;
  }
}
