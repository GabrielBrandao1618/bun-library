import { Author } from "../../../../app/entity/author";

type DrizzleAuthor = {
  id: string;
  name: string;
};

export class AuthorsDrizzleMapper {
  static fromDomain(author: Author): DrizzleAuthor {
    return {
      id: author.id,
      name: author.name,
    };
  }
  static toDomain(author: DrizzleAuthor): Author {
    return new Author(author.id, author.name);
  }
}
