import express, { Express, Request, Response } from "express"
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import taskRouter from "./routes/tasks";

dotenv.config();
const PORT = process.env.PORT || 3000;
const CLIENT_API = process.env.CLIENT_URL || 3000;
const app = express();

app.use(cors({
  origin: `${CLIENT_API}`,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "server is running" })
})

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

app.listen(PORT, () => console.log('Server running on http://localhost:3000'));

;
