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
        async ({ listAuthors, query }) => {
          const authors = await listAuthors.execute(
            Number(query.offset),
            Number(query.limit)
          );

          return authors.map((author) => ({
            id: author.id,
            name: author.name,
          }));
        },
        {
          response: t.Array(authorResponseSchema),
          query: t.Object({
            offset: t.String(),
            limit: t.String(),
          }),
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
