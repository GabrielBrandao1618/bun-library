import { Book } from "../entity/book";

export interface BooksRepository {
  create(book: Book): Promise<void>;
  findAll(): Promise<Book[]>;
  save(book: Book): Promise<void>;
}
