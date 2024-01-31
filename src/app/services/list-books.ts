import { BooksRepository } from "../repository/books-repository";

export class ListBooks {
  constructor(private readonly booksRepository: BooksRepository) {}
  async execute() {
    return await this.booksRepository.findMany();
  }
}
