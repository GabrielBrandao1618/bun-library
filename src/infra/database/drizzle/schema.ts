import { text, integer, pgSchema } from "drizzle-orm/pg-core";

export const schema = pgSchema("library");

export const users = schema.table("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const authors = schema.table("authors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const books = schema.table("books", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  numPages: integer("num_pages").notNull(),
  authorId: text("author_id")
    .references(() => authors.id)
    .notNull(),
});

export const physicalBooks = schema.table("physical_books", {
  id: text("id").primaryKey(),
  borrowedBy: text("borrowed_by").references(() => users.id),
  bookId: text("book_id")
    .references(() => books.id)
    .notNull(),
});
