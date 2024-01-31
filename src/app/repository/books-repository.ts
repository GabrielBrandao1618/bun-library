import { Book } from "../entity/book";

export interface BooksRepository {
  create(book: Book): Promise<void>;
  findMany(offset: number, limit: number): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  save(book: Book): Promise<void>;
  findByAuthor(authorId: string): Promise<Book[]>;
}
