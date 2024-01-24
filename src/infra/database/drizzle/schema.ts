import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  passwordHash: text("password_hash"),
});

export const authors = pgTable("authors", {
  id: text("id").primaryKey(),
  name: text("name"),
});

export const books = pgTable("books", {
  id: text("id").primaryKey(),
  title: text("title"),
  numPages: integer("num_pages"),
  authorId: text("author_id")
    .references(() => authors.id)
    .notNull(),
});

export const physicalBooks = pgTable("physical_books", {
  id: text("id").primaryKey(),
  borrowedBy: text("borrowed_by").references(() => users.id),
  bookId: text("book_id")
    .references(() => books.id)
    .notNull(),
});
