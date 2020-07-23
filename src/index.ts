import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { userRouter } from "./routes/userRoutes";
import { feedRouter } from "./routes/feedRoutes";
import { friendRouter } from "./routes/friendRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/feed", feedRouter);
app.use("/friend", friendRouter);

/* Configurações do express para iniciar o servidor */
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});

