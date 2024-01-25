import { User } from "../../../../app/entity/user";

type DrizzleUser = {
  id: string;
  name: string;
  passwordHash: string;
  email: string;
};

export class UsersDrizzleMapper {
  static toDomain(user: DrizzleUser): User {
    return new User(user.id, user.name, user.email, user.passwordHash);
  }
  fromDomain(user: User): DrizzleUser {
    return {
      email: user.email,
      id: user.id,
      name: user.name,
      passwordHash: user.passwordHash,
    };
  }
}
