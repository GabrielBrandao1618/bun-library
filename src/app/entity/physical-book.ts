export class PhysicalBook {
  id: string;
  bookId: string;
  borrowedBy?: string;

  constructor(id: string, bookId: string) {
    this.id = id;
    this.bookId = bookId;
  }
  borrow(borrowerId: string) {
    if (!this.isAvailable()) {
      throw new Error("Book is not available");
    }
    this.borrowedBy = borrowerId;
  }
  return() {
    this.borrowedBy = undefined;
  }
  isAvailable() {
    return this.borrowedBy === undefined;
  }
}
