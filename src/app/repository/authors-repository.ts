import { Author } from "../entity/author";

export interface AuthorsRepository {
  create(author: Author): Promise<void>;
  findMany(): Promise<Author[]>;
  findById(authorId: string): Promise<Author | null>;
  save(author: Author): Promise<void>;
}
