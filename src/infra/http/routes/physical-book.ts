import { bearer } from "@elysiajs/bearer";

import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";

export const physicalBookRoutes = new Elysia()
  .use(servicesPlugin)
  .use(bearer())
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
      .put(
        "/borrow",
        async ({ bearer, verifySignIn, borrowBook, body }) => {
          const tokenPayload = await verifySignIn.execute(bearer!);
          const result = await borrowBook.execute(
            body.physicalBookId,
            tokenPayload.id
          );
          return result;
        },
        {
          beforeHandle: async ({ bearer, set }) => {
            if (!bearer) {
              set.status = "Unauthorized";
              return "Unauthorized";
            }
          },
          body: t.Object({
            physicalBookId: t.String(),
          }),
        }
      )
  );
