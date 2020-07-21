import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { signUp } from "./signUp";



import { loginEndpoint } from "./endpoints/login";
import { addFriendEndpoint } from "./endpoints/addFriend";
import { undoFriendshipEndpoint } from "./endpoints/undoFriendship";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/signup", signUp);
/* path dos endpoints -- manter aqui temporariamente */

app.post("/login", loginEndpoint);
app.post("/add-friend", addFriendEndpoint);
app.post("/undo-friendship", undoFriendshipEndpoint);

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

