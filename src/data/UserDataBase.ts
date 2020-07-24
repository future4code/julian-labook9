import { BaseDatabase } from './BaseDatabase'
import { USER_ROLES, User } from '../model/User';


export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = 'User'

  /* Queries que se comunicam com a tabela de usuários no banco de dados */
  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.name,
        dbModel.email,
        dbModel.password,
        dbModel.role,
      )
    )
  }
  public async createUser(user: User): Promise<void> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return new User(result[0].id, result[0].name, result[0].email, result[0].password, result[0].USER_ROLES);
  }

  public async getUserById(id: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }
}