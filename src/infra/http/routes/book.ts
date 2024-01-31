import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";
import { AppDependencies } from "../app";

const bookResponseSchema = t.Object({
  id: t.String(),
  authorId: t.String(),
  numPages: t.Number(),
  title: t.String(),
});

const tags = ["Book"];

export const bookRoutes = (deps: AppDependencies) =>
  new Elysia().use(servicesPlugin(deps)).group("/book", (app) =>
    app
      .get(
        "/",
        async ({ listBooks, query }) => {
          const books = await listBooks.execute(
            Number(query.offset),
            Number(query.limit)
          );
          return books.map((book) => ({
            id: book.id,
            title: book.title,
            numPages: book.numPages,
            authorId: book.authorId,
          }));
        },
        {
          response: t.Array(bookResponseSchema),
          detail: { tags },
          query: t.Object({
            offset: t.String(),
            limit: t.String(),
          }),
        }
      )
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
        {
          query: t.Object({ author: t.String() }),
          response: t.Array(bookResponseSchema),
          detail: { tags },
        }
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
          response: bookResponseSchema,
          detail: { tags },
        }
      )
  );
