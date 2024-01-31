import { setupDatabase } from "./src/infra/database/drizzle/client";
import { AuthorsDrizzleRepository } from "./src/infra/database/drizzle/repository/authors-drizzle-repository";
import { BooksDrizzleRepository } from "./src/infra/database/drizzle/repository/books-drizzle-repository";
import { PhysicalBooksDrizzleRepository } from "./src/infra/database/drizzle/repository/physical-books-drizzle-repository";
import { UsersDrizzleRepository } from "./src/infra/database/drizzle/repository/users-drizzle-repository";
import { app } from "./src/infra/http/app";
import { AuthorsRedisRepository } from "./src/infra/redis/proxy/authors-redis-repository";
import { BooksRedisRepository } from "./src/infra/redis/proxy/books-redis-repository";
import { PhysicalBooksRedisRepository } from "./src/infra/redis/proxy/physical-books-redis-repository";
import { UsersRedisRepository } from "./src/infra/redis/proxy/users-redis-repository";
import { AuthTokenWebStrategy } from "./src/infra/strategy/auth-token-web-strategy";
import { PasswordHashingWebStrategy } from "./src/infra/strategy/password-hashing-web-strategy";

const passwordHashingStrategy = new PasswordHashingWebStrategy();
const authTokenStrategy = new AuthTokenWebStrategy();
const usersRepository = new UsersRedisRepository(new UsersDrizzleRepository());
const booksRepository = new BooksRedisRepository(new BooksDrizzleRepository());
const authorsRepository = new AuthorsRedisRepository(
  new AuthorsDrizzleRepository()
);
const physicalBooksRepository = new PhysicalBooksRedisRepository(
  new PhysicalBooksDrizzleRepository()
);

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

await main();
