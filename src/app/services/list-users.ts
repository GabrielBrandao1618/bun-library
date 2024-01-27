import { UsersRepository } from "../repository/users-repository";

export class ListUsers {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute() {
    return await this.usersRepository.findAll();
  }
}
