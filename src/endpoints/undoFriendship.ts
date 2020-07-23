// import { Request, Response } from "express";
// import { BaseDatabase } from "../data/BaseDatabase";
// import { Authenticator } from "../services/Authenticator";
// import { UserDatabase } from "../data/UserDatabase";
// import { UsersRelationDatabase } from "../data/UsersRelationDatabase";

// /* Desfazer amizade pelo id - POST => /undo-friendship */
// export const undoFriendshipEndpoint = async (req: Request, res: Response) => {
//     try {
//         const token = req.headers.authorization as string;
//         const undoFriendshipById = req.body.undoFriendshipById;

//         const authenticator = new Authenticator();
//         const authenticationData = authenticator.getData(token);
//         const userId = authenticationData.id;

//         if (!undoFriendshipById) {
//             throw new Error("Insira um id de usuário válido")
//         };

//         const userDatabase = new UserDatabase();
//         const user = await userDatabase.getUserById(undoFriendshipById);

//         if (!user) {
//             throw new Error("Usuário não existe")
//         };

//         const usersRelationDatabase = new UsersRelationDatabase();
//         await usersRelationDatabase.undoFriendship(
//             userId,
//             undoFriendshipById
//         );

//         res.status(200).send({ message: "Você deixou de seguir o usuário com sucesso!" });

//     } catch (err) {
//         res.status(400).send({ message: err.message });
//     };
//     await BaseDatabase.destroyConnection();
// };