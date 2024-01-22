import { PhysicalBooksRepository } from "../repository/physical-books-repository";
import { UsersRepository } from "../repository/users-repository";

export class BorrowBook {
  constructor(
    private readonly physicalBooksRepository: PhysicalBooksRepository,
    private readonly usersRepository: UsersRepository
  ) {}
  async execute(physicalBookId: string, borrowerId: string) {
    const foundBook = await this.physicalBooksRepository.findById(
      physicalBookId
    );
    if (foundBook === null) {
      throw new Error("Physical book not found");
    }
    const foundUser = await this.usersRepository.findById(borrowerId);
    if (foundUser === null) {
      throw new Error("Borrower not found");
    }
    foundBook.borrow(borrowerId);
    await this.physicalBooksRepository.save(foundBook);
    return foundBook;
  }
}
