import { AuthorsRepository } from "../repository/authors-repository";

export class ListAuthors {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(offset: number, limit: number) {
    return await this.authorsRepository.findMany(offset, limit);
  }
}
