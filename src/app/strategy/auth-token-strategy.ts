export interface AuthTokenStrategy {
  sign(payload: object): Promise<string>;
}
