import { describe, expect, it } from "bun:test";
import { AuthorsTestRepository } from "../../test/repositories/authors-test-repository";
import { AddAuthor } from "./add-author";

describe("Add author tests", () => {
  it("Should create the author", async () => {
    const authorsRepository = new AuthorsTestRepository();
    const addAuthor = new AddAuthor(authorsRepository);

    const result = await addAuthor.execute("John Doe");
    expect(result.name).toBe("John Doe");
  });
});
