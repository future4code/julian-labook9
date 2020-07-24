import jwt from "jsonwebtoken";
import { USER_ROLES, toUserRole } from "../model/User";

export class Authenticator {
  private static getExpiresIn(): number {
    return Number(process.env.ACCESS_TOKEN_EXPIRES_IN);
  }
  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: input.id,
        email: input.email,
        role: input.role

      },
      process.env.JWT_KEY as string,
      {
        expiresIn: Authenticator.getExpiresIn()
      }
    );
    return token;
  }

  /* Método que verifica o token e extrai dele o id */
  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      email: payload.email,
      role: toUserRole(payload.role)
    }
    return result;
  }
}

interface AuthenticationData {
  id: string;
  email: string;
  role: USER_ROLES;

}