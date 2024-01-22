import { randomUUID } from "crypto";

import { PhysicalBooksRepository } from "../repository/physical-books-repository";
import { BooksRepository } from "../repository/books-repository";
import { PhysicalBook } from "../entity/physical-book";

export class CreatePhysicalBook {
  constructor(
    private readonly physicalBooksRepository: PhysicalBooksRepository,
    private readonly booksRepository: BooksRepository
  ) {}
  async execute(bookId: string) {
    const existingBook = await this.booksRepository.findById(bookId);
    if (existingBook === null) {
      throw new Error("Book not found");
    }
    const id = randomUUID();
    const newPhysicalBook = new PhysicalBook(id, bookId);
    await this.physicalBooksRepository.create(newPhysicalBook);
    return newPhysicalBook;
  }
}
