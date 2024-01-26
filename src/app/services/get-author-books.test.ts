import { describe, expect, it } from "bun:test";
import { BooksTestRepository } from "../../test/repositories/books-test-repository";
import { GetAuthorBooks } from "./get-author-books";
import { Book } from "../entity/book";

describe("Get author books tests", () => {
  it("Should get all author's books", async () => {
    const repo = new BooksTestRepository();
    const getAuthorBooks = new GetAuthorBooks(repo);

    await Promise.all([
      repo.create(new Book("aaaa", "A book", "aaaa", 65)),
      repo.create(new Book("bbbb", "A book - prequel", "aaaa", 67)),
      repo.create(new Book("cccc", "A random book", "bbbb", 60)),
    ]);

    const result = await getAuthorBooks.execute("aaaa");

    expect(result).toHaveLength(2);
  });
});
