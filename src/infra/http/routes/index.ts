import { Elysia } from "elysia";
import { userRoutes } from "./user";
import { bookRoutes } from "./book";
import { authorRoutes } from "./author";
import { physicalBookRoutes } from "./physical-book";
import { AppDependencies } from "../app";

export const routes = (deps: AppDependencies) =>
  new Elysia()
    .use(userRoutes(deps))
    .use(bookRoutes(deps))
    .use(authorRoutes(deps))
    .use(physicalBookRoutes(deps));
