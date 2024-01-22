import { randomUUID } from "crypto";

import { AuthorsRepository } from "../repository/authors-repository";
import { Author } from "../entity/author";

export class AddAuthor {
  constructor(private readonly authorsRepository: AuthorsRepository) {}
  async execute(name: string) {
    const id = randomUUID();
    const newAuthor = new Author(id, name);
    await this.authorsRepository.create(newAuthor);
    return newAuthor;
  }
}
