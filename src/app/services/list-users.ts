import { UsersRepository } from "../repository/users-repository";

export class ListUsers {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(offset: number, limit: number) {
    return await this.usersRepository.findMany(offset, limit);
  }
}
