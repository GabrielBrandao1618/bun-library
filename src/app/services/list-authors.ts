import { AuthorsRepository } from "../repository/authors-repository";

export class ListAuthors {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute() {
    return await this.authorsRepository.findMany();
  }
}
