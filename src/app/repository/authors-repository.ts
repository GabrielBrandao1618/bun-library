import { Author } from "../entity/author";

export interface AuthorsRepository {
  create(author: Author): Promise<void>;
  findAll(): Promise<Author[]>;
  save(author: Author): Promise<void>;
}
