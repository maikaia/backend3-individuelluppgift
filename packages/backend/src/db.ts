import MessageItem from "@my-chat-app-typescript/shared"
import { connect, model, Schema } from "mongoose"

const MessageSchema = new Schema({
    text: String,
    author: String,
    timeStamp: Date
})

const MessageModel = model<MessageItem>("MessageItem", MessageSchema)

export const setupMongoDb = async (url: string) => {
    try {
        console.info(`Setup MongoDB connection to ${url}!`);
        await connect(url);
    } catch (e) {
        console.error("Error connecting to MongoDB!", e);
        throw e;
    }
}

export const loadAllMessages = async (): Promise<MessageItem[]> => {
    return await MessageModel.find({}).exec()
}

export const saveMessage = async (messageItem: MessageItem): Promise<void> => {
    const newModel = new MessageModel(messageItem)
    newModel.save()
}