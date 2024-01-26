import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";

export const bookRoutes = new Elysia()
  .use(servicesPlugin)
  .group("/book", (app) =>
    app.post(
      "/create",
      async ({ body, createBook }) => {
        const book = await createBook.execute(
          body.title,
          body.authorId,
          body.numPages
        );
        return {
          id: book.id,
          authorId: book.authorId,
          numPages: book.numPages,
          title: book.title,
        };
      },
      {
        body: t.Object({
          title: t.String(),
          authorId: t.String(),
          numPages: t.Number(),
        }),
      }
    )
  );
