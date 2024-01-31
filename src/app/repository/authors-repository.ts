import { Author } from "../entity/author";

export interface AuthorsRepository {
  create(author: Author): Promise<void>;
  findMany(offset: number, limit: number): Promise<Author[]>;
  findById(authorId: string): Promise<Author | null>;
  save(author: Author): Promise<void>;
}
