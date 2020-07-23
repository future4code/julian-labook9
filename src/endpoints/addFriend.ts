// import { Request, Response } from "express";
// import { BaseDatabase } from "../data/BaseDatabase";
// import { Authenticator } from "../services/Authenticator";
// import { UserDatabase } from "../data/UserDatabase";
// import { UsersRelationDatabase } from "../data/UsersRelationDatabase";

// /* Adicionar amigo pelo id - POST => /add-friend */
// export const addFriendEndpoint = async (req: Request, res: Response) => {
//     try {
//         const token = req.headers.authorization as string;
//         const addFriendById = req.body.addFriendById;

//         const authenticator = new Authenticator();
//         const authenticationData = authenticator.getData(token);
//         const userId = authenticationData.id;

//         if (!addFriendById) {
//             throw new Error("Insira um id de usuário válido")
//         };

//         const userDatabase = new UserDatabase();
//         const user = await userDatabase.getUserById(addFriendById);

//         if (!user) {
//             throw new Error("Usuário não existe")
//         };

//         const usersRelationDatabase = new UsersRelationDatabase();
//         await usersRelationDatabase.addFriend(
//             userId,
//             addFriendById
//         );

//         res.status(200).send({ message: "Usuário adicionado com sucesso! :)" });

//     } catch (err) {
//         res.status(400).send({ message: err.message });
//     };
//     await BaseDatabase.destroyConnection();
// };