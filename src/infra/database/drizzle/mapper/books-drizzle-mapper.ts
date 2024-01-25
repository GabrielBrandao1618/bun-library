import { Book } from "../../../../app/entity/book";

type DrizzleBook = {
  id: string;
  title: string;
  numPages: number;
  authorId: string;
};

export class BooksDrizzleMapper {
  static fromDomain(book: Book): DrizzleBook {
    return {
      authorId: book.authorId,
      id: book.id,
      numPages: book.numPages,
      title: book.title,
    };
  }
  static toDomain(book: DrizzleBook): Book {
    return new Book(book.id, book.title, book.authorId, book.numPages);
  }
}
