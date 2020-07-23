// import { Request, Response } from "express";
// import HashManager from "../services/HashManager";
// import { Authenticator } from "../services/Authenticator";
// import { BaseDatabase } from "../data/BaseDatabase";
// import { UserDatabase } from "../data/UserDataBase";


// /* Login de usuário criado - POST => /login */
// export const loginEndpoint = async (req: Request, res: Response) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         const role = req.body.role;

//         const userDataBase = new UserDatabase();
//         const user = await userDataBase.getUserByEmail(email);

//         const hashManager = new HashManager();

//         /* Validação senha */
//         const isPasswordCorrect = await hashManager.compare(password, user.password);

//         if (!isPasswordCorrect) {
//             throw new Error("Usuário ou senha inválidos")
//         };

//         /* Validação email */
//         if (!email || email.indexOf("@") === -1) {
//             throw new Error("Email inválido")
//         };

//         /* Validação campos */
//         if (!email || !password) {
//             throw new Error("Parâmetros inválidos")
//         };

//         const authenticator = new Authenticator();

//         const token = authenticator.generateToken({
//             id: user.id,
//             role: role
//         });

//         res.status(200).send({ access_token: token });

//     } catch (err) {
//         res.status(400).send({ message: err.message });
//     };

//     await BaseDatabase.destroyConnection();
// };