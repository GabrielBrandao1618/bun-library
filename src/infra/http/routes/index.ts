import { Elysia } from "elysia";
import { userRoutes } from "./user";
import { bookRoutes } from "./book";
import { authorRoutes } from "./author";

export const routes = new Elysia()
  .use(userRoutes)
  .use(bookRoutes)
  .use(authorRoutes);
