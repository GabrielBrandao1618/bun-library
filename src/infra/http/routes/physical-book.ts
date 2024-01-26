import Elysia, { t } from "elysia";
import { servicesPlugin } from "../../elysia/services-plugin";

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
      .put("/borrow", async ({}) => {}, {
        beforeHandle: async ({ headers, request }) => {
          const token = headers["auth-token"].split(" ")[1]; // Ignore the 'bearer' word in the token
        },
        headers: t.Object({
          "auth-token": t.String(),
        }),
      })
  );
