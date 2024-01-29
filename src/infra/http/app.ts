import { Elysia } from "elysia";
import { routes } from "./routes";
import { AuthorsRepository } from "../../app/repository/authors-repository";
import { BooksRepository } from "../../app/repository/books-repository";
import { PhysicalBooksRepository } from "../../app/repository/physical-books-repository";
import { UsersRepository } from "../../app/repository/users-repository";
import { AuthTokenStrategy } from "../../app/strategy/auth-token-strategy";
import { PasswordHashingStrategy } from "../../app/strategy/password-hashing-strategy";

export interface AppDependencies {
  passwordHashingStrategy: PasswordHashingStrategy;
  authTokenStrategy: AuthTokenStrategy;
  usersRepository: UsersRepository;
  booksRepository: BooksRepository;
  authorsRepository: AuthorsRepository;
  physicalBooksRepository: PhysicalBooksRepository;
}

export const app = (deps: AppDependencies) => {
  return new Elysia().use(routes(deps));
};
