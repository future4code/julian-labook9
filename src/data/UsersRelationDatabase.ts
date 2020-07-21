import { BaseDatabase } from "./BaseDatabase";

export class UsersRelationDatabase extends BaseDatabase {
    private static TABLE_NAME = "users_relation";

    public async addFriend(userId: string, addFriendById: string): Promise<void> {
        await this.getConnection()
            .insert({
                user_id: userId,
                add_friend_by_id: addFriendById
            })
            .into(UsersRelationDatabase.TABLE_NAME);
    };

    public async undoFriendship(userId: string, undoFriendshipById: string): Promise<void> {
        await this.getConnection()
            .delete()
            .from(UsersRelationDatabase.TABLE_NAME)
            .where({
                user_id: userId,
                add_friend_by_id: undoFriendshipById
            })
    };
};