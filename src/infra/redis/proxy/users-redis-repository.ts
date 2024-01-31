import { User } from "../../../app/entity/user";
import { UsersRepository } from "../../../app/repository/users-repository";
import { redisClient } from "../client";

type RedisUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

export class UsersRedisRepository implements UsersRepository {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(user: User): Promise<void> {
    return await this.usersRepository.create(user);
  }
  async findMany(): Promise<User[]> {
    return await this.usersRepository.findMany();
  }
  async findByEmail(email: string): Promise<User | null> {
    const redisKey = `userByEmail:${email}`;
    const rawCached = await redisClient.get(redisKey);
    const parsedCached = rawCached
      ? (JSON.parse(rawCached) as RedisUser)
      : null;
    if (parsedCached === null) {
      const nonCachedUser = await this.usersRepository.findByEmail(email);
      if (nonCachedUser === null) {
        return null;
      }
      const jsonUser: RedisUser = {
        email: nonCachedUser.email,
        id: nonCachedUser.id,
        name: nonCachedUser.name,
        passwordHash: nonCachedUser.passwordHash,
      };
      new Promise(async () => {
        await redisClient.set(redisKey, JSON.stringify(jsonUser));
        await redisClient.expire(redisKey, 30);
      });

      return nonCachedUser;
    }
    return new User(
      parsedCached.id,
      parsedCached.name,
      parsedCached.email,
      parsedCached.passwordHash
    );
  }
  async findById(id: string): Promise<User | null> {
    const redisKey = `userById:${id}`;
    const rawCached = await redisClient.get(redisKey);
    const parsedCached = rawCached
      ? (JSON.parse(rawCached) as RedisUser)
      : null;
    if (parsedCached === null) {
      const nonCachedUser = await this.usersRepository.findById(id);
      if (nonCachedUser === null) {
        return null;
      }
      const jsonUser: RedisUser = {
        email: nonCachedUser.email,
        id: nonCachedUser.id,
        name: nonCachedUser.name,
        passwordHash: nonCachedUser.passwordHash,
      };
      new Promise(async () => {
        await redisClient.set(redisKey, JSON.stringify(jsonUser));
        await redisClient.expire(redisKey, 30);
      });
      return nonCachedUser;
    }
    return new User(
      parsedCached.id,
      parsedCached.name,
      parsedCached.email,
      parsedCached.passwordHash
    );
  }
  async save(user: User): Promise<void> {
    return this.usersRepository.save(user);
  }
}
