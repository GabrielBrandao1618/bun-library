import { Author } from "../../app/entity/author";
import { AuthorsRepository } from "../../app/repository/authors-repository";

export class AuthorsTestRepository implements AuthorsRepository {
  authors: Author[] = [];
  async create(author: Author): Promise<void> {
    this.authors.push(author);
  }
  async findMany(): Promise<Author[]> {
    return this.authors;
  }
  async findById(authorId: string): Promise<Author | null> {
    return this.authors.find((author) => author.id === authorId) ?? null;
  }
  async save(author: Author): Promise<void> {
    const targetIndex = this.authors.findIndex((item) => item.id === author.id);
    if (targetIndex < 0) return;
    this.authors[targetIndex] = author;
  }
}
