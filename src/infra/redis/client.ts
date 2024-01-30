import { Redis } from "ioredis";

const redisPort = Number(process.env.REDIS_PORT) ?? 6379;

export const redisClient = new Redis({
  port: redisPort,
});
