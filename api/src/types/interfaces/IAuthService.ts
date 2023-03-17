export interface IAuthService<T, M> {
  register(obj: T): Promise<M>;
  login(obj: T): Promise<M>;
}
