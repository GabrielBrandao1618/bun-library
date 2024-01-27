import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";

export const authorRoutes = new Elysia()
  .use(servicesPlugin)
  .group("/author", (app) =>
    app
      .get("/", async ({ listAuthors }) => {
        const authors = await listAuthors.execute();

        return authors.map((author) => ({
          id: author.id,
          name: author.name,
        }));
      })
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
          response: t.Object({
            name: t.String(),
            id: t.String(),
          }),
        }
      )
  );
