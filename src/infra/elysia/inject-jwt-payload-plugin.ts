import bearer from "@elysiajs/bearer";
import Elysia from "elysia";
import { servicesPlugin } from "./services-plugin";

export const injectJwtPayloadPlugin = new Elysia()
  .use(servicesPlugin)
  .use(bearer())
  .derive(async ({ bearer, verifySignIn }) => {
    if (!bearer) {
      return {
        jwtPayload: null,
      };
    }
    const payload = await verifySignIn.execute(bearer);
    return {
      jwtPayload: payload,
    };
  })
  .onBeforeHandle(async ({ jwtPayload, set }) => {
    if (!jwtPayload) {
      set.status = "Unauthorized";
      return "Unauthorized";
    }
  });
