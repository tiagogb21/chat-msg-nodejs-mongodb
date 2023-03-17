import { model as mongooseCreateModel, Schema } from "mongoose";
import { IMessage } from "../../types/interfaces/IMessages";
import { IUser, userZodSchema } from "../../types/interfaces/IUser";
import MongoModel from "./Generic.model";

const messageZodSchema = new Schema<IMessage>({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

class MessageModel extends MongoModel<IMessage> {
  constructor(model = mongooseCreateModel("Message", messageZodSchema)) {
    super(model);
  }
}

export default MessageModel;
