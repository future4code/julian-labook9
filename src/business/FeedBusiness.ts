import moment from "moment"
import {TypePost, Post} from "../model/Post"
import { IdGenerator } from "../services/IdGenerator";
import { PostDatabase } from "../data/PostDatabase";
import { Authenticator } from "../services/Authenticator";
import { FeedDatabase } from "../data/FeedDatabase";
import { type } from "os";

export class FeedBusiness {
    private static POSTS_LIMIT = 5;
    private static TABLE_NAME = 'Posts';

    public async createPost(
        post_id: string,
        user_id:string,
        photo: string,
        description: string,
        creation_date: string = moment().format("YYYY-MM-DD"),
        type: TypePost ) 
        {
        if (!description) {
          throw new Error("Invalid description");
        }

        const postId = new IdGenerator().generate();
    
        const postsDb = new PostDatabase();
    
        const posts = new Post(post_id, user_id, photo, description, creation_date, type);
    
        await postsDb.createPost(posts);
      }

}
