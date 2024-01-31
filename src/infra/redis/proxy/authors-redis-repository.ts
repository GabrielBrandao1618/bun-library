import { Author } from "../../../app/entity/author";
import { AuthorsRepository } from "../../../app/repository/authors-repository";
import { redisClient } from "../client";

interface RedisAuthor {
  name: string;
  id: string;
}

export class AuthorsRedisRepository implements AuthorsRepository {
  constructor(private readonly authorsRepository: AuthorsRepository) {}
  async create(author: Author): Promise<void> {
    return await this.authorsRepository.create(author);
  }
  async findMany(): Promise<Author[]> {
    return await this.authorsRepository.findMany();
  }
  async findById(authorId: string): Promise<Author | null> {
    const redisKey = `authorById:${authorId}`;
    const rawCached = await redisClient.get(redisKey);
    if (rawCached === null) {
      const nonCached = await this.authorsRepository.findById(authorId);
      if (nonCached === null) {
        return null;
      }
      new Promise(async () => {
        await redisClient.set(
          redisKey,
          JSON.stringify({
            id: nonCached.id,
            name: nonCached.name,
          } as RedisAuthor)
        );
        await redisClient.expire(redisKey, 30);
      });
      return nonCached;
    }
    const parsedCached: RedisAuthor = JSON.parse(rawCached);
    return parsedCached;
  }
  async save(author: Author): Promise<void> {
    return await this.authorsRepository.save(author);
  }
}
