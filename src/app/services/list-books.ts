import { BooksRepository } from "../repository/books-repository";

export class ListBooks {
  constructor(private readonly booksRepository: BooksRepository) {}
  async execute(offset: number, limit: number) {
    return await this.booksRepository.findMany(offset, limit);
  }
}
