import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";


export class UserController {
    async signUpEndpoint(req: Request, res: Response) {
        try {
            const result = await new UserBusiness().signup(
                req.body.name,
                req.body.email,
                req.body.password,
                req.body.role
            )

            res.status(200).send({
                message: 'Usuário criado com sucesso',
                result
            });


        } catch (error) {
            res.status(400).send({
                message: "error"
            })
        }
        await BaseDatabase.destroyConnection();
    };

    async loginEndpoint(req: Request, res: Response) {
        try {
            const result = await new UserBusiness().login(
                req.body.email,
                req.body.password,
                req.body.role
            )

            res.status(200).send({ result });

        } catch (err) {
            res.status(400).send({ message: err.message });
        };

        await BaseDatabase.destroyConnection();
    };



};
