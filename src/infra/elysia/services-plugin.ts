import Elysia from "elysia";
import { SignUp } from "../../app/services/sign-up";
import { CreateAuthor } from "../../app/services/create-author";
import { CreateBook } from "../../app/services/create-book";
import { CreatePhysicalBook } from "../../app/services/create-physical-book";
import { SignIn } from "../../app/services/sign-in";
import { BorrowBook } from "../../app/services/borrow-book";
import { VerifySignIn } from "../../app/services/verify-sign-in";
import { ListUsers } from "../../app/services/list-users";
import { ListPhysicalBooks } from "../../app/services/list-physical-books";
import { ListBooks } from "../../app/services/list-books";
import { ListAuthors } from "../../app/services/list-authors";
import { GetAuthorBooks } from "../../app/services/get-author-books";
import { ReturnBook } from "../../app/services/return-book";
import { AppDependencies } from "../http/app";

export const servicesPlugin = (deps: AppDependencies) => {
  return new Elysia({ name: "services-plugin", seed: deps }).decorate({
    signUp: new SignUp(deps.usersRepository, deps.passwordHashingStrategy),
    createAuthor: new CreateAuthor(deps.authorsRepository),
    createBook: new CreateBook(deps.booksRepository, deps.authorsRepository),
    createPhysicalBook: new CreatePhysicalBook(
      deps.physicalBooksRepository,
      deps.booksRepository
    ),
    signIn: new SignIn(
      deps.usersRepository,
      deps.authTokenStrategy,
      deps.passwordHashingStrategy
    ),
    borrowBook: new BorrowBook(
      deps.physicalBooksRepository,
      deps.usersRepository
    ),
    verifySignIn: new VerifySignIn(deps.authTokenStrategy),
    listUsers: new ListUsers(deps.usersRepository),
    listPhysicalBooks: new ListPhysicalBooks(deps.physicalBooksRepository),
    listBooks: new ListBooks(deps.booksRepository),
    listAuthors: new ListAuthors(deps.authorsRepository),
    getAuthorBooks: new GetAuthorBooks(deps.booksRepository),
    returnBook: new ReturnBook(
      deps.physicalBooksRepository,
      deps.usersRepository
    ),
  });
};
