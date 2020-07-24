import { BaseDatabase } from "./BaseDatabase";
import { Post, GetPostsByTypeDTO } from "../model/Post";
import { PostDatabase } from "./PostDatabase";

export class FeedDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'Posts';

    public async createFeed(userId: string): Promise<Post[]> {
        const result = await this.getConnection().raw(`
            SELECT Posts.posts_id, photo, description, creation_date, type, User.id, User.name
            FROM Posts
            JOIN users_relation
            ON users_relation.user_add_friend_by_id = Posts.user_id 
            AND users_relation.user_id = '${userId}'
            JOIN User
            ON Posts.user_id = User.id; 
        `);
        return result[0]
    }

    public async getPostsByType(userData: GetPostsByTypeDTO): Promise<Post[]> {

        const users = await this.getConnection()
            .select("*")
            .from(FeedDatabase.TABLE_NAME)
            .where({type: userData.type})
            .orderBy(userData.orderType)

        await BaseDatabase.destroyConnection()
               
        return users
    }
};