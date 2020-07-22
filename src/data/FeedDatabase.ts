import { BaseDatabase } from "./BaseDatabase";


export class FeedDatabase extends BaseDatabase {
    public async getFeed(userId: string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT Posts.posts_id, photo, description, creation_date, type, User.id, User.name
            FROM Posts
            JOIN users_relation
            ON users_relation.user_to_follow_id = Posts.user_id 
            AND users_relation.user_id = '${userId}'
            JOIN User
            ON Posts.user_id = User.id; 
        `);
        return result[0]
    }
}