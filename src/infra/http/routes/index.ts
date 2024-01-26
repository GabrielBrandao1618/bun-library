import { Elysia } from "elysia";
import { userRoutes } from "./user";
import { bookRoutes } from "./book";
import { authorRoutes } from "./author";
import { physicalBookRoutes } from "./physical-book";

export const routes = new Elysia()
  .use(userRoutes)
  .use(bookRoutes)
  .use(authorRoutes)
  .use(physicalBookRoutes);
