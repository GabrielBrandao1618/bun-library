import { describe, expect, it } from "bun:test";
import { AuthorsTestRepository } from "../../test/repositories/authors-test-repository";
import { CreateAuthor } from "./create-author";

describe("Add author tests", () => {
  it("Should create the author", async () => {
    const authorsRepository = new AuthorsTestRepository();
    const createAuthor = new CreateAuthor(authorsRepository);

    const result = await createAuthor.execute("John Doe");
    expect(result.name).toBe("John Doe");
  });
});
