import Elysia, { t } from "elysia";

export const userRoutes = new Elysia().post(
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
