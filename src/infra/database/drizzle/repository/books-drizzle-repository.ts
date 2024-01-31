import { eq } from "drizzle-orm";
import { Book } from "../../../../app/entity/book";
import { BooksRepository } from "../../../../app/repository/books-repository";
import { db } from "../client";
import { BooksDrizzleMapper } from "../mapper/books-drizzle-mapper";
import { books } from "../schema";

export class BooksDrizzleRepository implements BooksRepository {
  async create(book: Book): Promise<void> {
    await db.insert(books).values(BooksDrizzleMapper.fromDomain(book));
  }
  async findMany(offset: number, limit: number): Promise<Book[]> {
    return (await db.select().from(books).offset(offset).limit(limit)).map(
      (book) => BooksDrizzleMapper.toDomain(book)
    );
  }
  async findById(id: string): Promise<Book | null> {
    const foundBooks = await db.select().from(books).where(eq(books.id, id));
    if (foundBooks.length < 1) {
      return null;
    }
    return foundBooks[0];
  }
  async save(book: Book): Promise<void> {
    await db
      .update(books)
      .set(BooksDrizzleMapper.fromDomain(book))
      .where(eq(books.id, book.id));
  }
  async findByAuthor(authorId: string): Promise<Book[]> {
    return (
      await db.select().from(books).where(eq(books.authorId, authorId))
    ).map((book) => BooksDrizzleMapper.toDomain(book));
  }
}
