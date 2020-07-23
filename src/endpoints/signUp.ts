// import {Request, Response} from "express";
// import { IdGenerator } from "../services/IdGenerator";
// import HashManager from "../services/HashManager";
// import { Authenticator } from "../services/Authenticator";
// import { UserDatabase } from "../data/UserDataBase";


// export const signUpEndpoint = async (req: Request, res: Response) => {
//     try {
//         const name = req.body.name;
//         const email = req.body.email;
//         const password = req.body.password;
//         const role = req.body.role

//         /* Verificação dos campos desejados*/
//         if(!name || !email || !password) {
//             throw new Error('Insira todas as informações desejadas para o cadastro');
//         }

//         if(password.length < 6){
//             throw new Error('A senha deve ter no minimo 6 caracteres')
//         }
//         /* Gerando o Id*/
//         const idGenerator = new IdGenerator();
//         const id = idGenerator.generate();

//         /*Criptografando a senha do usuário*/
//         const hashManager = new HashManager();
//         const hashPassword = await hashManager.hash(password);

//         const userDataBase = new UserDatabase();
//         await userDataBase.createUser(
//             id,
//             name,
//             email,
//             hashPassword,
//             role
//         );

//         const authenticator = new Authenticator();
//         const token = authenticator.generateToken({id, role});

//         res.status(200).send({
//             message: 'Usuário criado com sucesso',
//             token
//         });

        
//     } catch (error) {
//         res.status(400).send({
//             message: "error"
//         })
//     }
// }
