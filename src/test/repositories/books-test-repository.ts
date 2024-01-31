import { Book } from "../../app/entity/book";
import { BooksRepository } from "../../app/repository/books-repository";

export class BooksTestRepository implements BooksRepository {
  books: Book[] = [];
  async create(book: Book): Promise<void> {
    this.books.push(book);
  }
  async findMany(): Promise<Book[]> {
    return this.books;
  }
  async save(book: Book): Promise<void> {
    const targetIndex = this.books.findIndex((item) => item.id === book.id);
    if (targetIndex < 0) return;
    this.books[targetIndex] = book;
  }
  async findById(id: string): Promise<Book | null> {
    return this.books.find((book) => book.id === id) ?? null;
  }
  async findByAuthor(authorId: string): Promise<Book[]> {
    return this.books.filter((book) => book.authorId === authorId);
  }
}
