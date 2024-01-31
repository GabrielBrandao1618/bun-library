import { eq } from "drizzle-orm";

import { User } from "../../../../app/entity/user";
import { UsersRepository } from "../../../../app/repository/users-repository";

import { db } from "../client";
import { UsersDrizzleMapper } from "../mapper/users-drizzle-mapper";
import { users } from "../schema";

export class UsersDrizzleRepository implements UsersRepository {
  async create(user: User): Promise<void> {
    await db.insert(users).values({
      id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash,
    });
  }
  async findMany(): Promise<User[]> {
    return (await db.select().from(users)).map((user) =>
      UsersDrizzleMapper.toDomain(user)
    );
  }
  async findByEmail(email: string): Promise<User | null> {
    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (foundUsers.length < 1) {
      return null;
    }
    return UsersDrizzleMapper.toDomain(foundUsers[0]);
  }
  async findById(id: string): Promise<User | null> {
    const foundUsers = await db.select().from(users).where(eq(users.id, id));
    if (foundUsers.length < 1) {
      return null;
    }
    return UsersDrizzleMapper.toDomain(foundUsers[0]);
  }
  async save(user: User): Promise<void> {
    await db
      .update(users)
      .set({
        email: user.email,
        name: user.name,
        passwordHash: user.passwordHash,
      })
      .where(eq(users.id, user.id));
  }
}
