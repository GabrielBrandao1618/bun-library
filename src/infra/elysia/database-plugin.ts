import Elysia, { type Context } from "elysia";
import { UsersDrizzleRepository } from "../database/drizzle/repository/users-drizzle-repository";
import { BooksDrizzleRepository } from "../database/drizzle/repository/books-drizzle-repository";
import { PhysicalBooksDrizzleRepository } from "../database/drizzle/repository/physical-books-drizzle-repository";
import { AuthorsDrizzleRepository } from "../database/drizzle/repository/authors-drizzle-repository";

export const databasePlugin = new Elysia<"">().decorate({
  usersRepository: new UsersDrizzleRepository(),
  booksRepository: new BooksDrizzleRepository(),
  physicalBooksRepository: new PhysicalBooksDrizzleRepository(),
  authorsRepository: new AuthorsDrizzleRepository(),
});
