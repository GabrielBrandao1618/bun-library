import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { routes } from "./routes";

export const app = new Elysia().use(swagger()).use(routes);
