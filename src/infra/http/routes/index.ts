import { Elysia } from "elysia";
import { userRoutes } from "./user";

export const routes = new Elysia().use(userRoutes);
