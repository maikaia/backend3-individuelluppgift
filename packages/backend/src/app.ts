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

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "8800"); // makes sure it's a number

app.use(cors()); // TODO configure cors , this way is not secure
app.use(json()); // Parse json

app.get("/message", (req: Request, res: Response<MessageItem>) => {
    res.json({
        id: "123",
        text: "My first message",
        author: "Nolle",
        timeStamp: new Date()
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});