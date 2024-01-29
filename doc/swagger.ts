import swagger from "@elysiajs/swagger";
import { app } from "../src/infra/http/app";
import { PasswordHashingTestStrategy } from "../src/test/strategy/password-hashing-test-strategy";
import { AuthTokenTestStrategy } from "../src/test/strategy/auth-token-test-strategy";
import { UsersTestRepository } from "../src/test/repositories/users-test-repository";
import { BooksTestRepository } from "../src/test/repositories/books-test-repository";
import { AuthorsTestRepository } from "../src/test/repositories/authors-test-repository";
import { PhysicalBooksTestRepository } from "../src/test/repositories/physical-books-test-repository";

const passwordHashingStrategy = new PasswordHashingTestStrategy();
const authTokenStrategy = new AuthTokenTestStrategy();
const usersRepository = new UsersTestRepository();
const booksRepository = new BooksTestRepository();
const authorsRepository = new AuthorsTestRepository();
const physicalBooksRepository = new PhysicalBooksTestRepository();

async function main() {
  app({
    passwordHashingStrategy,
    authorsRepository,
    authTokenStrategy,
    booksRepository,
    physicalBooksRepository,
    usersRepository,
  })
    .use(swagger())
    .listen(8080);
  console.log("📑 Swagger documentation started");
}

await main();
