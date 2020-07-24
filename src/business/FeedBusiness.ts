import { Post, GetPostsByTypeDTO } from "../model/Post"
import { CustomError } from "../errors/CustomError"
import { FeedDatabase } from "../data/FeedDatabase"

export class FeedBusiness {
    async getPostsByType(postData: GetPostsByTypeDTO): Promise<Post[]> {

        const validTypes: string[] = ["Normal", "Evento"]

        if(!validTypes.includes(postData.type)){
            throw new CustomError(
                406,
                "Parâmetro type deve retornar apenas parâmetros do tipo Normal ou Evento."
            )
        }

        if(!["ASC", "DESC"].includes(postData.orderType)){
            throw new CustomError(
                406,
                "Parâmetro orderBy deve ser do tipo Normal ou Evento."
            )
        }

       const posts: Post[] = await new FeedDatabase().getPostsByType(postData);

        if(!posts.length){
            throw new CustomError(
                404,
                "Não existem postagens"
            )
        }

        return posts
    }
}