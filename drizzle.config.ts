import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/infra/database/drizzle/schema.ts",
  out: "drizzle",
  verbose: true,
  strict: true,
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? "",
  },
});
