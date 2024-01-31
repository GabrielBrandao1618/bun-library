import { User } from "../../app/entity/user";
import { UsersRepository } from "../../app/repository/users-repository";

export class UsersTestRepository implements UsersRepository {
  users: User[] = [];
  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }
  async create(user: User): Promise<void> {
    this.users.push(user);
  }
  async findMany(offset: number, limit: number): Promise<User[]> {
    return this.users.slice(offset, offset + limit);
  }
  async save(user: User): Promise<void> {
    const targetIndex = this.users.findIndex((item) => item.id === user.id);
    if (targetIndex < 0) return;
    this.users[targetIndex] = user;
  }
}
