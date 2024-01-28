import { setupDatabase } from "./src/infra/database/drizzle/client";
import { AuthorsDrizzleRepository } from "./src/infra/database/drizzle/repository/authors-drizzle-repository";
import { BooksDrizzleRepository } from "./src/infra/database/drizzle/repository/books-drizzle-repository";
import { PhysicalBooksDrizzleRepository } from "./src/infra/database/drizzle/repository/physical-books-drizzle-repository";
import { UsersDrizzleRepository } from "./src/infra/database/drizzle/repository/users-drizzle-repository";
import { app } from "./src/infra/http/app";
import { AuthTokenWebStrategy } from "./src/infra/strategy/auth-token-web-strategy";
import { PasswordHashingWebStrategy } from "./src/infra/strategy/password-hashing-web-strategy";

const passwordHashingStrategy = new PasswordHashingWebStrategy();
const authTokenStrategy = new AuthTokenWebStrategy();
const usersRepository = new UsersDrizzleRepository();
const booksRepository = new BooksDrizzleRepository();
const authorsRepository = new AuthorsDrizzleRepository();
const physicalBooksRepository = new PhysicalBooksDrizzleRepository();

async function main() {
  await setupDatabase();
  app({
    authorsRepository,
    authTokenStrategy,
    booksRepository,
    passwordHashingStrategy,
    physicalBooksRepository,
    usersRepository,
  }).listen(8080);
  console.log("🔥 App running at port 8080");
}

main();
