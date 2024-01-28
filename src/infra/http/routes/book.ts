import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";
import { AppDependencies } from "../app";

export const bookRoutes = (deps: AppDependencies) => {
  return new Elysia().use(servicesPlugin(deps)).group("/book", (app) =>
    app
      .get("/", async ({ listBooks }) => {
        const books = await listBooks.execute();
        return books.map((book) => ({
          id: book.id,
          title: book.title,
          numPages: book.numPages,
          authorId: book.authorId,
        }));
      })
      .get(
        "/by-author",
        async ({ query, getAuthorBooks }) => {
          const books = await getAuthorBooks.execute(query.author);
          return books.map((book) => ({
            id: book.id,
            title: book.title,
            numPages: book.numPages,
            authorId: book.authorId,
          }));
        },
        { query: t.Object({ author: t.String() }) }
      )
      .post(
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
          response: t.Object({
            id: t.String(),
            authorId: t.String(),
            numPages: t.Number(),
            title: t.String(),
          }),
        }
      )
  );
};
