import { PhysicalBook } from "../../../app/entity/physical-book";
import { PhysicalBooksRepository } from "../../../app/repository/physical-books-repository";
import { redisClient } from "../client";

interface RedisPhysicalBook {
  id: string;
  bookId: string;
  borrowedBy?: string;
}

export class PhysicalBooksRedisRepository implements PhysicalBooksRepository {
  constructor(
    private readonly physicalBooksRepository: PhysicalBooksRepository
  ) {}
  async create(physicalBook: PhysicalBook): Promise<void> {
    return await this.physicalBooksRepository.create(physicalBook);
  }
  async findMany(offset: number, limit: number): Promise<PhysicalBook[]> {
    return await this.physicalBooksRepository.findMany(offset, limit);
  }
  async save(physicalBook: PhysicalBook): Promise<void> {
    return await this.physicalBooksRepository.save(physicalBook);
  }
  async findById(id: string): Promise<PhysicalBook | null> {
    const redisKey = `physicalBookById:${id}`;
    const rawCached = await redisClient.get(redisKey);
    if (rawCached === null) {
      const nonCached = await this.physicalBooksRepository.findById(id);
      if (nonCached === null) {
        return null;
      }
      new Promise(async () => {
        await redisClient.set(
          redisKey,
          JSON.stringify({
            bookId: nonCached.bookId,
            id: nonCached.id,
            borrowedBy: nonCached.borrowedBy,
          } as RedisPhysicalBook)
        );
        await redisClient.expire(redisKey, 30);
      });
      return nonCached;
    }
    const parsedCached = JSON.parse(rawCached) as RedisPhysicalBook;
    return new PhysicalBook(
      parsedCached.id,
      parsedCached.bookId,
      parsedCached.borrowedBy
    );
  }
}
