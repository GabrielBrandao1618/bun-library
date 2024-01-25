import Elysia, { t } from "elysia";
import { databasePlugin } from "../../elysia/database-plugin";

export const userRoutes = new Elysia().use(databasePlugin).post(
  "/sign-up",
  async ({ body }) => {
    console.log(body);
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
  }
);
