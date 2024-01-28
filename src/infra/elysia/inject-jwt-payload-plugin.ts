import bearer from "@elysiajs/bearer";
import Elysia from "elysia";
import { servicesPlugin } from "./services-plugin";
import { AppDependencies } from "../http/app";

export const injectJwtPayloadPlugin = (deps: AppDependencies) =>
  new Elysia({ name: "inject-jwt-payload-plugin", seed: deps })
    .use(servicesPlugin(deps))
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
