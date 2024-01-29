import { app } from "../../infra/http/app";
import { AuthorsTestRepository } from "../repositories/authors-test-repository";
import { BooksTestRepository } from "../repositories/books-test-repository";
import { PhysicalBooksTestRepository } from "../repositories/physical-books-test-repository";
import { UsersTestRepository } from "../repositories/users-test-repository";
import { AuthTokenTestStrategy } from "../strategy/auth-token-test-strategy";
import { PasswordHashingTestStrategy } from "../strategy/password-hashing-test-strategy";

const passwordHashingStrategy = new PasswordHashingTestStrategy();
const authTokenStrategy = new AuthTokenTestStrategy();
const usersRepository = new UsersTestRepository();
const booksRepository = new BooksTestRepository();
const authorsRepository = new AuthorsTestRepository();
const physicalBooksRepository = new PhysicalBooksTestRepository();

export const testApp = app({
  passwordHashingStrategy,
  authorsRepository,
  authTokenStrategy,
  booksRepository,
  physicalBooksRepository,
  usersRepository,
});
