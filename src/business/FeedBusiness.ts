import moment from "moment";
import { IdGenerator } from "../services/IdGenerator";
import { TypePost, Post, GetPostsByTypeDTO } from "../model/Post";
import { PostDatabase } from "../data/PostDatabase";
import { CustomError } from "../errors/CustomError";
import { FeedDatabase } from "../data/FeedDatabase";


export class FeedBusiness {
  private static POSTS_LIMIT = 5;
  private static TABLE_NAME = 'Posts';

  public async createPost(
    post_id: string,
    user_id: string,
    photo: string,
    description: string,
    creation_date: string = moment().format("YYYY-MM-DD"),
    type: TypePost) {
    if (!description) {
      throw new Error("Invalid description");
    }

    const postId = new IdGenerator().generate();

    const postsDb = new PostDatabase();

    const posts = new Post(post_id, user_id, photo, description, creation_date, type);

    await postsDb.createPost(posts);
  }

  async getPostsByType(postData: GetPostsByTypeDTO): Promise<Post[]> {

    const validTypes: string[] = ["Normal", "Evento"]

    if (!validTypes.includes(postData.type)) {
      throw new CustomError(
        406,
        "Parâmetro type deve retornar apenas parâmetros do tipo Normal ou Evento."
      )
    }

    if (!["ASC", "DESC"].includes(postData.orderType)) {
      throw new CustomError(
        406,
        "Parâmetro orderBy deve ser do tipo Normal ou Evento."
      )
    }

    const posts: Post[] = await new FeedDatabase().getPostsByType(postData);

    if (!posts.length) {
      throw new CustomError(
        404,
        "Não existem postagens"
      )
    }

    return posts
  }
}
