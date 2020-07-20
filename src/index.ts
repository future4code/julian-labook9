import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { IdGenerator } from "./services/IdGenerator";
import { UserDatabase } from "./data/UserDataBase";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/singup", async (req: Request, res: Response)=>{
    try{ 
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const userData = {
            name: req.body.name,
            email: req.body.email,
        }

        const userDatabase = new UserDatabase();
        await userDatabase.singup(id, userData.name, userData.email);

        res.status(200).send({message: "User create!"})
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

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

