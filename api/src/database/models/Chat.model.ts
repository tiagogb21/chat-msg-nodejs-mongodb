import { model as mongooseCreateModel, Schema } from "mongoose";
import { IChat, chatZodSchema } from "../../types/interfaces/IChat";
import MongoModel from "./Generic.model";

const chatMongoSchema = new Schema<IChat>({
  _id: { type: String },
  groupId: { type: String },
  messages: {
    type: Schema.Types.ObjectId,
    ref: "Message",
    required: true,
  },
});

class ChatModel extends MongoModel<IChat> {
  constructor(model = mongooseCreateModel("Chat", chatMongoSchema)) {
    super(model);
  }
}

export default ChatModel;
