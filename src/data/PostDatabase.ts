import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    private static TABLE_NAME = 'Posts';

    public async createPost(post_id: string, user_id:string, photo: string, description: string, create_date: number, type: TypePost): Promise<void>{
        await this.getConnection()
        .insert({post_id, user_id, photo, description, create_date, type})
        .into(PostDatabase.TABLE_NAME)
    };

    public async getPostById(PostId: string): Promise<any>{
        const result = await this.getConnection()
            .select('*')
            .from(PostDatabase.TABLE_NAME)
            .where({post_id: PostId});
        return result[0]
    };
};

export enum TypePost{
    NORMAL = 'Normal',
    EVENTO = 'Evento'
};