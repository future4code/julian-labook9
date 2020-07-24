import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { FeedDatabase } from "../data/FeedDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import moment from "moment";
import { FeedBusiness } from "../business/FeedBusiness";

export class FeedController {
    async createPostEndpoint (req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const userId = authenticationData.id;

            const result = await new FeedBusiness().createPost(
                req.body.post_id,
                userId,
                req.body.photo,
                req.body.description,
                req.body.creation_date,
                req.body.type
            )

            res.status(200).send({
                message: "Post criado!",
                result
            });
        } catch (error) {
            res.status(400).send({
                message: error
            })
        }
        await BaseDatabase.destroyConnection();
    }    

    async feedEndpoint (req: Request , res: Response) {
        try {
            const token = req.headers.authorization as string;
            
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const userId = authenticationData.id;
    
            const feedDatabase = new FeedDatabase();
            const feed = await feedDatabase.createFeed(userId);
            const mappedFeed = feed.map((post: any) =>({
                id: post.post_id,
                photo: post.title,
                description: post.description,
                creation_date: moment(post.createdAt).format('DD/MM/YYYY'),
                userId,
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