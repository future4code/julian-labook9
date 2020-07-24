import { BaseDatabase } from "./BaseDatabase";
import { Post } from "../model/Post";


export class PostDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Posts';

    private toModel (dbModel? : any): Post | undefined {
        return (
          dbModel && 
          new Post (
            dbModel.post_id,
            dbModel.user_id,
            dbModel.photo,
            dbModel.description,
            dbModel.creation_date,
            dbModel.type
          )
        )
      }

    public async getPost(limit: number, offset: number): Promise<Post[]> {
        const result = await this.getConnection()
          .select("*")
          .from(PostDatabase.TABLE_NAME)
          .orderBy("title")
          .limit(limit)
          .offset(offset);
          return result.map((posts) => {
            return this.toModel(posts);
          }) as Post[];
    };

    public async createPost(post: Post): Promise<void>{
        await this.getConnection()
        .insert({
            post_id:post.getId(),
            user_id:post.getPost(),
            photo:post.getPhoto(),
            description:post.getDescription(),
            creation_date:post.getCreationDate(),
            type:post.getType()
        }).into(PostDatabase.TABLE_NAME)
    };

    public async getPostById(PostId: string): Promise<Post> {
        const result = await this.getConnection()
            .select('*')
            .from(PostDatabase.TABLE_NAME)
            .where({ post_id: PostId });
        return result[0]
    };
};