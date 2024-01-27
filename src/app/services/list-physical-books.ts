import { PhysicalBooksRepository } from "../repository/physical-books-repository";

export class ListPhysicalBooks {
  constructor(
    private readonly physicalBooksRepository: PhysicalBooksRepository
  ) {}
  async execute() {
    return await this.physicalBooksRepository.findAll();
  }
}
