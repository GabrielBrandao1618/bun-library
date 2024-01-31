import { PhysicalBook } from "../../app/entity/physical-book";
import { PhysicalBooksRepository } from "../../app/repository/physical-books-repository";

export class PhysicalBooksTestRepository implements PhysicalBooksRepository {
  books: PhysicalBook[] = [];
  async create(physicalBook: PhysicalBook): Promise<void> {
    this.books.push(physicalBook);
  }
  async findMany(offset: number, limit: number): Promise<PhysicalBook[]> {
    return this.books.slice(offset, offset + limit);
  }
  async save(physicalBook: PhysicalBook): Promise<void> {
    const targetIndex = this.books.findIndex(
      (item) => item.id === physicalBook.id
    );
    if (targetIndex < 0) return;
    this.books[targetIndex] = physicalBook;
  }
  async findById(id: string): Promise<PhysicalBook | null> {
    return this.books.find((book) => book.id === id) ?? null;
  }
}
