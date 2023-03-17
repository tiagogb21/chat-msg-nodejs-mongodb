import { model as mongooseCreateModel, Schema } from "mongoose";
import { IUser, userZodSchema } from "../../types/interfaces/IUser";
import MongoModel from "./Generic.model";

const userMongoSchema = new Schema<IUser>({
  _id: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    get: function () {
      return this.firstName + " " + this.lastName;
    },
  },
  avatar: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
      },
    },
    required: false,
  },
});

class UserModel extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel("User", userMongoSchema)) {
    super(model);
  }
}

export default UserModel;
