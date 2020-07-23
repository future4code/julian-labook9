// import { Request, Response } from "express";
// import { Authenticator } from "../services/Authenticator";
// import { IdGenerator } from "../services/IdGenerator";
// import { PostDatabase } from "../data/PostDatabase";
// import { BaseDatabase } from "../data/BaseDatabase";
// import moment from "moment";

// export const createPostEndpoint = async (req: Request, res: Response) => {

//     try {
//         // *Receber token 
//         const token = req.headers.authorization!;

//         // *Gerar User_Id com o token
//         const authenticator = new Authenticator();
//         const authenticationData = authenticator.getData(token);
//         const userId = authenticationData.id;

//         // *Gerar um Post_Id
//         const idGenerator = new IdGenerator();
//         const postId = idGenerator.generate();

//         // *Recebendo dados pelo Body
//         const { photo, description, type, creationDate } = req.body;

//         // *Criar Post
//         const postDatabase = new PostDatabase();
//         await postDatabase.createPost(
//             postId, userId, photo, description, creationDate, type
//         );

//         res.status(200).send({message: "Post criado!"})

//     } catch (err) {
//         res.status(400).send({message: err.message})
//     };
    
//     await BaseDatabase.destroyConnection();
// }