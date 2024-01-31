import { User } from "../entity/user";

export interface UsersRepository {
  create(user: User): Promise<void>;
  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
