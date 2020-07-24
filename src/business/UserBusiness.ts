import { USER_ROLES, User, toUserRole } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {
    public async signup(
        name: string,
        email: string,
        password: string,
        role: USER_ROLES) {
        if (!name || !email || !password) {
            throw new Error('Insira todas as informações desejadas para o cadastro');
        }

        if (password.length < 6) {
            throw new Error('A senha deve ter no minimo 6 caracteres')
        }

        /* Gerando o Id*/
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        /*Criptografando a senha do usuário*/
        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);

        const userDataBase = new UserDatabase();
        const user = new User(id, name, email, hashPassword, toUserRole(role))
        await userDataBase.createUser(user);

        const accessToken = new Authenticator().generateToken({
            id: user.getId(),
            email: user.getEmail(),
            role: user.getRole(),
        });

        return { id: id, accessToken };
    }

    public async login(
        email: string,
        password: string,
        role: USER_ROLES) {
        /* Validação email */
        if (!email || email.indexOf("@") === -1) {
            throw new Error("Email inválido")
        };

        /* Validação campos */
        if (!email || !password) {
            throw new Error("Parâmetros inválidos")
        };

        const userDataBase = new UserDatabase();
        const user = await userDataBase.getUserByEmail(email);

        /* Validação senha */
        const isPasswordCorrect = await new HashManager().compare(
            password,
            user?.getPassword()
        );

        if (!isPasswordCorrect) {
            throw new Error("Usuário ou senha inválidos");
        }

        const access_token = new Authenticator().generateToken({
            id: user.getId(),
            email: user.getEmail(),
            role: user.getRole(),
        });

        return { access_token };
    }
};

