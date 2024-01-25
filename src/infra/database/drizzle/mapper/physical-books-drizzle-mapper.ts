import { PhysicalBook } from "../../../../app/entity/physical-book";

type DrizzlePhysicalBook = {
  id: string;
  borrowedBy: string | null;
  bookId: string;
};

export class PhysicalBooksDrizzleMapper {
  static fromDomain(physicalBook: PhysicalBook): DrizzlePhysicalBook {
    return {
      bookId: physicalBook.bookId,
      id: physicalBook.id,
      borrowedBy: physicalBook.borrowedBy ?? null,
    };
  }
  static toDomain(physicalBook: DrizzlePhysicalBook): PhysicalBook {
    return new PhysicalBook(
      physicalBook.id,
      physicalBook.bookId,
      physicalBook.borrowedBy ?? undefined
    );
  }
}
