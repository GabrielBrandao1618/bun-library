import { Elysia } from "elysia";
import { routes } from "./routes";

export const app = new Elysia().use(routes);
