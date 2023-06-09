export interface IModel<T> {
  create?(obj: T): Promise<T>;
  read?(): Promise<T[] | null>;
  readOne?(_id: string): Promise<T | null>;
  readOneByQuery?(query: object): Promise<T | null>;
  update?(_id: string, obj: T): Promise<T | null>;
  delete?(_id: string): Promise<T | null>;
}
