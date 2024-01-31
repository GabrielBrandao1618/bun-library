import { eq } from "drizzle-orm";
import { Author } from "../../../../app/entity/author";
import { AuthorsRepository } from "../../../../app/repository/authors-repository";
import { db } from "../client";
import { AuthorsDrizzleMapper } from "../mapper/authors-drizzle-mapper";
import { authors } from "../schema";

export class AuthorsDrizzleRepository implements AuthorsRepository {
  async create(author: Author): Promise<void> {
    await db.insert(authors).values(AuthorsDrizzleMapper.fromDomain(author));
  }
  async findMany(): Promise<Author[]> {
    return (await db.select().from(authors)).map((author) =>
      AuthorsDrizzleMapper.toDomain(author)
    );
  }
  async findById(authorId: string): Promise<Author | null> {
    const foundAuthors = await db
      .select()
      .from(authors)
      .where(eq(authors.id, authorId));
    if (foundAuthors.length < 1) {
      return null;
    }
    return AuthorsDrizzleMapper.toDomain(foundAuthors[0]);
  }
  async save(author: Author): Promise<void> {
    await db
      .update(authors)
      .set(AuthorsDrizzleMapper.fromDomain(author))
      .where(eq(authors.id, author.id));
  }
}
