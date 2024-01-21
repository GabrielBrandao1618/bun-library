import { User } from "../entity/user";

export interface UsersRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
