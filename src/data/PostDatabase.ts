import { BaseDatabase } from "./BaseDatabase";
import { TypePost, Post } from "../model/Post";
import moment from "moment";

export class PostDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Posts';

    public async createPost(
        post_id: string,
        user_id: string,
        photo: string,
        description: string,
        creation_date: string = moment().format("YYYY-MM-DD"),
        type: TypePost
    ): Promise<void> {
        await this.getConnection()
            .insert({ post_id, user_id, photo, description, creation_date, type })
            .into(PostDatabase.TABLE_NAME)
    };

    public async getPostById(PostId: string): Promise<Post> {
        const result = await this.getConnection()
            .select('*')
            .from(PostDatabase.TABLE_NAME)
            .where({ post_id: PostId });
        return result[0]
    };
};