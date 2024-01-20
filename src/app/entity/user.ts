export class User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;

  constructor(id: string, name: string, email: string, passwordHash: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
  }
}
