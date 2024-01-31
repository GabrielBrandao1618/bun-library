import { PhysicalBook } from "../entity/physical-book";

export interface PhysicalBooksRepository {
  create(physicalBook: PhysicalBook): Promise<void>;
  findMany(offset: number, limit: number): Promise<PhysicalBook[]>;
  save(physicalBook: PhysicalBook): Promise<void>;
  findById(id: string): Promise<PhysicalBook | null>;
}
