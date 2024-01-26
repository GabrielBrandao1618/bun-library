import { describe, it, expect } from "bun:test";
import { AuthorsTestRepository } from "../../test/repositories/authors-test-repository";
import { ListAuthors } from "./list-authors";
import { Author } from "../entity/author";

describe("List authors tests", () => {
  it("Should list all authors", async () => {
    const repository = new AuthorsTestRepository();
    await repository.create(new Author("aaaa", "John Doe"));
    await repository.create(new Author("bbbb", "John Doe Junior"));
    await repository.create(new Author("cccc", "John Doe's grandpa"));
    const listAuthors = new ListAuthors(repository);

    const result = await listAuthors.execute();

    expect(result).toHaveLength(3);
  });
});
