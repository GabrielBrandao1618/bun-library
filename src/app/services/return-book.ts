import { PhysicalBooksRepository } from "../repository/physical-books-repository";
import { UsersRepository } from "../repository/users-repository";

export class ReturnBook {
  constructor(
    private readonly physicalBooksRepository: PhysicalBooksRepository,
    private readonly usersRepository: UsersRepository
  ) {}
  async execute(actorId: string, physicalBookId: string) {
    const foundUser = await this.usersRepository.findById(actorId);
    if (foundUser === null) {
      throw new Error("User not found");
    }
    const foundPhysicalBook = await this.physicalBooksRepository.findById(
      physicalBookId
    );
    if (foundPhysicalBook === null) {
      throw new Error("Physical book not found");
    }
    if (foundPhysicalBook.borrowedBy !== foundUser.id) {
      throw new Error("Book is not borrowed by this user");
    }
    foundPhysicalBook.return();
    await this.physicalBooksRepository.save(foundPhysicalBook);
    return foundPhysicalBook;
  }
}
