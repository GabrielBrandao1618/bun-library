CREATE SCHEMA "library";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "library"."authors" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "library"."books" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"num_pages" integer NOT NULL,
	"author_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "library"."physical_books" (
	"id" text PRIMARY KEY NOT NULL,
	"borrowed_by" text,
	"book_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "library"."users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "library"."books" ADD CONSTRAINT "books_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "library"."authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "library"."physical_books" ADD CONSTRAINT "physical_books_borrowed_by_users_id_fk" FOREIGN KEY ("borrowed_by") REFERENCES "library"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "library"."physical_books" ADD CONSTRAINT "physical_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "library"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
