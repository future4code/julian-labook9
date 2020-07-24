import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { FeedDatabase } from "../data/FeedDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import { PostDatabase } from "../data/PostDatabase";
import { IdGenerator } from "../services/IdGenerator";
import moment from "moment";

export class FeedController {
    async createPostEndpoint(req: Request, res: Response) {
        try {
            // *Receber token 
            const token = req.headers.authorization!;

            // *Gerar User_Id com o token
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const userId = authenticationData.id;

            // *Gerar um Post_Id
            const idGenerator = new IdGenerator();
            const postId = idGenerator.generate();

            // *Recebendo dados pelo Body
            const { photo, description, type, creationDate } = req.body;

            // *Criar Post
            const postDatabase = new PostDatabase();
            await postDatabase.createPost(
                postId, userId, photo, description, creationDate, type
            );

            res.status(200).send({ message: "Post criado!" })

        } catch (err) {
            res.status(400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    }

    async feedEndpoint(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const userId = authenticationData.id;

            const feedDatabase = new FeedDatabase();
            const feed = await feedDatabase.createFeed(userId);
            const mappedFeed = feed.map((post: any) => ({
                id: post.post_id,
                photo: post.title,
                description: post.description,
                creation_date: moment(post.createdAt).format('DD/MM/YYYY'),
                userId: post.user_id,
                userName: post.name
            }));
            res.status(200).send(mappedFeed);
        } catch (error) {
            res.status(200).send({
                message: error.message
            })
        }
        await BaseDatabase.destroyConnection();
    }

};