import Elysia from "elysia";
import { SignUp } from "../../app/services/sign-up";
import { UsersDrizzleRepository } from "../database/drizzle/repository/users-drizzle-repository";
import { PasswordHashingWebStrategy } from "../strategy/password-hashing-web-strategy";
import { BooksDrizzleRepository } from "../database/drizzle/repository/books-drizzle-repository";
import { AuthorsDrizzleRepository } from "../database/drizzle/repository/authors-drizzle-repository";
import { PhysicalBooksDrizzleRepository } from "../database/drizzle/repository/physical-books-drizzle-repository";
import { CreateAuthor } from "../../app/services/create-author";
import { CreateBook } from "../../app/services/create-book";
import { CreatePhysicalBook } from "../../app/services/create-physical-book";

const usersRepository = new UsersDrizzleRepository();
const booksRepository = new BooksDrizzleRepository();
const authorsRepository = new AuthorsDrizzleRepository();
const physicalBooksRepository = new PhysicalBooksDrizzleRepository();
const passwordHashingStrategy = new PasswordHashingWebStrategy();

export const servicesPlugin = new Elysia({ name: "services-plugin" }).decorate({
  signUp: new SignUp(usersRepository, passwordHashingStrategy),
  createAuthor: new CreateAuthor(authorsRepository),
  createBook: new CreateBook(booksRepository, authorsRepository),
  createPhysicalBook: new CreatePhysicalBook(
    physicalBooksRepository,
    booksRepository
  ),
});
