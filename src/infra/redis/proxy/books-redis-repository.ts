import { Book } from "../../../app/entity/book";
import { BooksRepository } from "../../../app/repository/books-repository";
import { redisClient } from "../client";

interface RedisBook {
  id: string;
  title: string;
  numPages: number;
  authorId: string;
}

export class BooksRedisRepository implements BooksRepository {
  constructor(private readonly booksRepository: BooksRepository) {}
  async create(book: Book): Promise<void> {
    return await this.booksRepository.create(book);
  }
  async findAll(): Promise<Book[]> {
    return await this.booksRepository.findAll();
  }
  async save(book: Book): Promise<void> {
    return await this.booksRepository.save(book);
  }
  async findById(id: string): Promise<Book | null> {
    const redisKey = `bookById:${id}`;
    const rawCached = await redisClient.get(redisKey);
    if (rawCached === null) {
      const nonCached = await this.booksRepository.findById(id);
      if (nonCached === null) {
        return null;
      }
      new Promise(async () => {
        await redisClient.set(
          redisKey,
          JSON.stringify({
            authorId: nonCached.authorId,
            id: nonCached.id,
            numPages: nonCached.numPages,
            title: nonCached.title,
          } as RedisBook)
        );
        await redisClient.expire(redisKey, 30);
      });
      return nonCached;
    }
    const parsedCached = JSON.parse(rawCached) as RedisBook;
    return new Book(
      parsedCached.id,
      parsedCached.title,
      parsedCached.authorId,
      parsedCached.numPages
    );
  }
  async findByAuthor(authorId: string): Promise<Book[]> {
    const redisKey = `booksByAuthorId:${authorId}`;
    const rawCached = await redisClient.get(redisKey);
    if (rawCached === null) {
      const nonCached = await this.booksRepository.findByAuthor(authorId);
      new Promise(async () => {
        await redisClient.set(
          redisKey,
          JSON.stringify(
            nonCached.map((item) => ({
              authorId: item.authorId,
              id: item.id,
              numPages: item.numPages,
              title: item.title,
            })) as RedisBook[]
          )
        );
        await redisClient.expire(redisKey, 30);
      });
      return nonCached;
    }
    const parsedCached = JSON.parse(rawCached) as RedisBook[];
    return parsedCached.map((item) => ({
      authorId: item.authorId,
      id: item.id,
      numPages: item.numPages,
      title: item.title,
    })) as RedisBook[];
  }
}
