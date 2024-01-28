import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";
import { injectJwtPayloadPlugin } from "../../elysia/inject-jwt-payload-plugin";
import { AppDependencies } from "../app";
export const physicalBookRoutes = (deps: AppDependencies) => {
  return new Elysia().use(servicesPlugin(deps)).group("/physical-book", (app) =>
    app
      .get("/", async ({ listPhysicalBooks }) => {
        const books = await listPhysicalBooks.execute();
        return books.map((book) => ({
          id: book.id,
          bookId: book.id,
          isAvailable: book.isAvailable(),
        }));
      })
      .post(
        "/create",
        async ({ body, createPhysicalBook }) => {
          const physicalBook = await createPhysicalBook.execute(body.bookId);
          return {
            id: physicalBook.id,
            isAvailable: physicalBook.isAvailable(),
            bookId: physicalBook.bookId,
          };
        },
        {
          body: t.Object({
            bookId: t.String(),
          }),
        }
      )

      .guard({}, (app) =>
        app
          .use(injectJwtPayloadPlugin(deps))
          .put(
            "/borrow",
            async ({ borrowBook, body, jwtPayload }) => {
              const result = await borrowBook.execute(
                body.physicalBookId,
                jwtPayload!.id
              );
              return {
                id: result.id,
                bookId: result.bookId,
                isAvailable: result.isAvailable(),
              };
            },
            {
              body: t.Object({
                physicalBookId: t.String(),
              }),
            }
          )
          .put(
            "/return",
            async ({ returnBook, jwtPayload, body }) => {
              const result = await returnBook.execute(
                jwtPayload!.id,
                body.physicalBookId
              );
              return {
                id: result.id,
                bookId: result.bookId,
                isAvailable: result.isAvailable(),
              };
            },
            {
              body: t.Object({
                physicalBookId: t.String(),
              }),
            }
          )
      )
  );
};
