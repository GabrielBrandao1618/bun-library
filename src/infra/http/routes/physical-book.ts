import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";
import { injectJwtPayloadPlugin } from "../../elysia/inject-jwt-payload-plugin";
export const physicalBookRoutes = new Elysia()
  .use(servicesPlugin)
  .group("/physical-book", (app) =>
    app
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
        app.use(injectJwtPayloadPlugin).put(
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
      )
  );
