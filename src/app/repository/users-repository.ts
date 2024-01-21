import { User } from "../entity/user";

export interface UsersRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
}
