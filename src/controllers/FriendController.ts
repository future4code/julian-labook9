import { BaseDatabase } from "../data/BaseDatabase";
import { Request, Response } from "express";
import { FriendBusiness } from "../business/FriendBusiness";


export class FriendController {
    async addFriendEndpoint(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const addFriendById = req.body.addFriendById;

            await new FriendBusiness().addFriend(token, addFriendById);

            res.status(200).send({ message: "Usuário adicionado com sucesso! :)" });

        } catch (err) {
            res.status(400).send({ message: err.message });
        };
        await BaseDatabase.destroyConnection();
    };

    async undoFriendshipEndpoint(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const undoFriendshipById = req.body.undoFriendshipById;

            await new FriendBusiness().undoFriendship(token, undoFriendshipById);

            res.status(200).send({ message: "Você deixou de seguir o usuário com sucesso!" });

        } catch (err) {
            res.status(400).send({ message: err.message });
        };
        await BaseDatabase.destroyConnection();
    };
}