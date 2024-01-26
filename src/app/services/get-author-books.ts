import { BooksRepository } from "../repository/books-repository";

export class GetAuthorBooks {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(authorId: string) {
    return this.booksRepository.findByAuthor(authorId);
  }
}
