import { it, expect } from "bun:test";
import { PhysicalBooksTestRepository } from "../../test/repositories/physical-books-test-repository";
import { ListPhysicalBooks } from "./list-physical-books";
import { PhysicalBook } from "../entity/physical-book";

it("Should list all physical books", async () => {
  const physicalBooksRepository = new PhysicalBooksTestRepository();
  const listPhysicalBooks = new ListPhysicalBooks(physicalBooksRepository);

  await Promise.all([
    physicalBooksRepository.create(new PhysicalBook("aaaa", "aaaa")),
    physicalBooksRepository.create(new PhysicalBook("bbbb", "aaaa")),
    physicalBooksRepository.create(new PhysicalBook("cccc", "aaaa")),
  ]);

  const result = await listPhysicalBooks.execute(0, 3);
  expect(result).toHaveLength(3);
});
