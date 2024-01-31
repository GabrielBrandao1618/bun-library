import { PhysicalBooksRepository } from "../repository/physical-books-repository";

export class ListPhysicalBooks {
  constructor(
    private readonly physicalBooksRepository: PhysicalBooksRepository
  ) {}
  async execute(offset: number, limit: number) {
    return await this.physicalBooksRepository.findMany(offset, limit);
  }
}
