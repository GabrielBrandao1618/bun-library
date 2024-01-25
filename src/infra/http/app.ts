import { Elysia, type Context } from "elysia";
import { routes } from "./routes";
import { UsersTestRepository } from "../../test/repositories/users-test-repository";
import { UsersRepository } from "../../app/repository/users-repository";

export const app = new Elysia()
  .decorate("usersRepository", new UsersTestRepository())
  .use(routes)
  .get("/", async () => {});
