export interface PasswordHashingStrategy {
  hash(password: string): Promise<string>;
}
