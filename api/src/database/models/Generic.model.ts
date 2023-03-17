import { isValidObjectId, Model } from "mongoose";
import { IModel } from "../../types/interfaces/IModel";

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  async readOne(_id: string): Promise<T | null> {
    return this._model.findOne({ _id });
  }

  async readOneByQuery(query: object): Promise<T | null> {
    return this._model.findOne(query);
  }

  async read(): Promise<T[] | null> {
    return this._model.find({});
  }

  async delete(_id: string): Promise<T | null> {
    return this._model.findByIdAndDelete({ _id });
  }

  async update(_id: string, obj: T): Promise<T | null> {
    return this._model.findByIdAndUpdate({ _id }, obj);
  }
}

export default MongoModel;
