// import { Response, Request } from "express";
// import { Authenticator } from "../services/Authenticator";
// import { FeedDatabase } from "../data/FeedDatabase";
// import moment from "moment";
// import { BaseDatabase } from "../data/BaseDatabase";

// export const FeedEndpoint = async (req: Request , res: Response) => {
//     try {
//         const token = req.headers.authorization as string;
        
//         const authenticator = new Authenticator();
//         const authenticationData = authenticator.getData(token);
//         const userId = authenticationData.id;

//         const feedDatabase = new FeedDatabase();
//         const feed = await feedDatabase.createFeed(userId);
//         const mappedFeed = feed.map((post: any) =>({
//             id: post.post_id,
//             photo: post.title,
//             description: post.description,
//             creation_date: moment(post.createdAt).format('DD/MM/YYYY'),
//             userId: post.user_id,
//             userName: post.name
//         }));
//         res.status(200).send(mappedFeed);
//     } catch (error) {
//         res.status(200).send({
//             message: error.message
//         })
//     }
//     await BaseDatabase.destroyConnection();
// }