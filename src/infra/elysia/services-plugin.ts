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
import { AuthTokenWebStrategy } from "../strategy/auth-token-web-strategy";
import { SignIn } from "../../app/services/sign-in";
import { BorrowBook } from "../../app/services/borrow-book";
import { VerifySignIn } from "../../app/services/verify-sign-in";
import { ListUsers } from "../../app/services/list-users";
import { ListPhysicalBooks } from "../../app/services/list-physical-books";
import { ListBooks } from "../../app/services/list-books";
import { ListAuthors } from "../../app/services/list-authors";
import { GetAuthorBooks } from "../../app/services/get-author-books";

const passwordHashingStrategy = new PasswordHashingWebStrategy();
const authTokenStrategy = new AuthTokenWebStrategy();
const usersRepository = new UsersDrizzleRepository();
const booksRepository = new BooksDrizzleRepository();
const authorsRepository = new AuthorsDrizzleRepository();
const physicalBooksRepository = new PhysicalBooksDrizzleRepository();

export const servicesPlugin = new Elysia({ name: "services-plugin" }).decorate({
  signUp: new SignUp(usersRepository, passwordHashingStrategy),
  createAuthor: new CreateAuthor(authorsRepository),
  createBook: new CreateBook(booksRepository, authorsRepository),
  createPhysicalBook: new CreatePhysicalBook(
    physicalBooksRepository,
    booksRepository
  ),
  signIn: new SignIn(
    usersRepository,
    authTokenStrategy,
    passwordHashingStrategy
  ),
  borrowBook: new BorrowBook(physicalBooksRepository, usersRepository),
  verifySignIn: new VerifySignIn(authTokenStrategy),
  listUsers: new ListUsers(usersRepository),
  listPhysicalBooks: new ListPhysicalBooks(physicalBooksRepository),
  listBooks: new ListBooks(booksRepository),
  listAuthors: new ListAuthors(authorsRepository),
  getAuthorBooks: new GetAuthorBooks(booksRepository),
});
