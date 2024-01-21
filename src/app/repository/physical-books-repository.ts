import { PhysicalBook } from "../entity/physical-book";

export interface BooksRepository {
  create(physicalBook: PhysicalBook): Promise<void>;
  findAll(): Promise<PhysicalBook[]>;
  save(physicalBook: PhysicalBook): Promise<void>;
}
