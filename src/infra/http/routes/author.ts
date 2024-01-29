import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";
import { AppDependencies } from "../app";

const authorResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
});

const tags = ["Author"];

export const authorRoutes = (deps: AppDependencies) =>
  new Elysia().use(servicesPlugin(deps)).group("/author", (app) =>
    app
      .get(
        "/",
        async ({ listAuthors }) => {
          const authors = await listAuthors.execute();

          return authors.map((author) => ({
            id: author.id,
            name: author.name,
          }));
        },
        {
          response: t.Array(authorResponseSchema),
          detail: { tags },
        }
      )
      .post(
        "/create",
        async ({ body, createAuthor }) => {
          const author = await createAuthor.execute(body.name);
          return {
            name: author.name,
            id: author.id,
          };
        },
        {
          body: t.Object({
            name: t.String(),
          }),
          response: authorResponseSchema,
          detail: { tags },
        }
      )
  );
