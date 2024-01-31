import { eq } from "drizzle-orm";
import { PhysicalBook } from "../../../../app/entity/physical-book";
import { PhysicalBooksRepository } from "../../../../app/repository/physical-books-repository";
import { db } from "../client";
import { PhysicalBooksDrizzleMapper } from "../mapper/physical-books-drizzle-mapper";
import { physicalBooks } from "../schema";

export class PhysicalBooksDrizzleRepository implements PhysicalBooksRepository {
  async create(physicalBook: PhysicalBook): Promise<void> {
    await db
      .insert(physicalBooks)
      .values(PhysicalBooksDrizzleMapper.fromDomain(physicalBook));
  }
  async findMany(): Promise<PhysicalBook[]> {
    return (await db.select().from(physicalBooks)).map((book) =>
      PhysicalBooksDrizzleMapper.toDomain(book)
    );
  }
  async save(physicalBook: PhysicalBook): Promise<void> {
    await db
      .update(physicalBooks)
      .set(PhysicalBooksDrizzleMapper.fromDomain(physicalBook))
      .where(eq(physicalBooks.id, physicalBook.id));
  }
  async findById(id: string): Promise<PhysicalBook | null> {
    const foundPhysicalBooks = await db
      .select()
      .from(physicalBooks)
      .where(eq(physicalBooks.id, id));
    if (foundPhysicalBooks.length < 1) {
      return null;
    }
    return PhysicalBooksDrizzleMapper.toDomain(foundPhysicalBooks[0]);
  }
}
