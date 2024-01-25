import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";

export const userRoutes = new Elysia().use(servicesPlugin).post(
  "/sign-up",
  async ({ body, signUp, set }) => {
    const user = await signUp.execute(body.name, body.email, body.password);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
    response: t.Object({
      id: t.String(),
      name: t.String(),
      email: t.String(),
    }),
  }
);
