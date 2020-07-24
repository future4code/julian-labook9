import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";
import { UsersRelationDatabase } from "../data/UsersRelationDatabase";

export class FriendBusiness {
    public async addFriend(
        token: string,
        addFriendById: string
    ) {
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);
        const userId = authenticationData.id;

        if (!addFriendById) {
            throw new Error("Insira um id de usuário válido")
        };

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(addFriendById);

        if (!user) {
            throw new Error("Usuário não existe")
        };

        const usersRelationDatabase = new UsersRelationDatabase();
        await usersRelationDatabase.addFriend(
            userId,
            addFriendById
        );

    };

    public async undoFriendship(token: string, undoFriendshipById: string) {
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);
        const userId = authenticationData.id;

        if (!undoFriendshipById) {
            throw new Error("Insira um id de usuário válido")
        };

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(undoFriendshipById);

        if (!user) {
            throw new Error("Usuário não existe")
        };

        const usersRelationDatabase = new UsersRelationDatabase();
        await usersRelationDatabase.undoFriendship(
            userId,
            undoFriendshipById
        );

    };
}