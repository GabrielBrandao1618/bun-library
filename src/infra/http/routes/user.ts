import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";
import { AppDependencies } from "../app";

const userResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
});

const tags = ["User"];

export const userRoutes = (deps: AppDependencies) =>
  new Elysia().use(servicesPlugin(deps)).group("/user", (app) =>
    app
      .get(
        "/",
        async ({ listUsers }) => {
          const users = await listUsers.execute();
          return users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
          }));
        },
        {
          detail: { tags },
          response: t.Array(userResponseSchema),
        }
      )
      .post(
        "/sign-up",
        async ({ body, signUp }) => {
          const user = await signUp.execute(
            body.name,
            body.email,
            body.password
          );
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
          response: userResponseSchema,
          detail: { tags },
        }
      )
      .post(
        "sign-in",
        async ({ signIn, body }) => {
          const token = await signIn.execute(body.email, body.password);
          return token;
        },
        {
          body: t.Object({
            email: t.String(),
            password: t.String(),
          }),
          response: t.String(),
          detail: {
            tags,
          },
        }
      )
  );
