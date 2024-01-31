import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import * as schema from "./schema";

const dbUrl = process.env.DATABASE_URL!;
export async function setupDatabase() {
  const migrationClient = postgres(dbUrl, { max: 1 });
  await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });
  migrationClient.end();
}

const queryClient = postgres(dbUrl);
export const db = drizzle(queryClient, { schema: schema });
