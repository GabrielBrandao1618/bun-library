import { User } from "../../app/entity/user";
import { UsersRepository } from "../../app/repository/users-repository";

export class UsersTestRepository implements UsersRepository {
  users: User[] = [];
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }
  async create(user: User): Promise<void> {
    this.users.push(user);
  }
  async findAll(): Promise<User[]> {
    return this.users;
  }
  async save(user: User): Promise<void> {
    const targetIndex = this.users.findIndex((item) => item.id === user.id);
    if (targetIndex < 0) return;
    this.users[targetIndex] = user;
  }
}
