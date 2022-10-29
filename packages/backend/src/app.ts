import express, {
    Application,
    Express,
    json,
    Request,
    Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import MessageItem from "@my-chat-app-typescript/shared";
import { setupMongoDb, loadAllMessages, saveMessage } from "./db"

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3001");
const mongoURL:string = process.env.MONGO_URL || "mongodb://127.0.0.1/message"

app.use(cors());
app.use(json());

app.get("/message", async (req: Request, res: Response<MessageItem[]>) => {
    const messageItems = await loadAllMessages()
    console.log("All messages", messageItems)
    res.send(messageItems)
});

app.post("/message", async (req: Request<MessageItem>, res: Response<MessageItem[]>) => {
    const messageItem = req.body
    const saved = await saveMessage(messageItem)
    console.log("Saved item:", messageItem)
    const messageItems = await loadAllMessages()
    console.log("All todos", messageItems)
    res.send(messageItems)
})


app.listen(PORT, async function () {
    await setupMongoDb(mongoURL)
    console.log(`Server running on port: ${PORT}`);
});