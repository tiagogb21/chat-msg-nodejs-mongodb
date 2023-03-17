import { IAuthService } from "../types/interfaces/IAuthService";
import { IModel } from "../types/interfaces/IModel";
import { IUser } from "../types/interfaces/IUser";
import CryptographyService from "../utils/BCrypt";
import JwtService from "../utils/JwtService";
import EmailService from "./Email.service";

export interface IMessageResponse {
  message: string;
}

export default class AuthService
  implements IAuthService<IUser, IMessageResponse>
{
  private _user: IModel<IUser>;
  readonly cryptographyService: CryptographyService;
  readonly jwtService: JwtService;
  readonly emailService: EmailService;

  constructor(model: IModel<IUser>) {
    this._user = model;
    this.cryptographyService = new CryptographyService();
    this.emailService = new EmailService();
  }

  async register(user: IUser): Promise<IMessageResponse> {
    const existingUser = await this._user.readOneByQuery({ email: user.email });

    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    const hashedPassword = await this.cryptographyService.encryptData(
      user.password
    );

    const confirmationToken = await this.emailService.sendConfirmationEmail(
      user.email
    );

    console.log(confirmationToken);

    const newUser = { password: hashedPassword, ...user, confirmationToken };

    const result = await this._user.create(newUser);

    return { message: "Usuário cadastrado com sucesso!" };
  }

  async login(user: IUser): Promise<IMessageResponse> {
    const existingUser = await this._user.readOneByQuery({ email: user.email });

    if (!existingUser) {
      throw new Error("Email ou senha inválidos!");
    }

    if (existingUser.isActive) {
      throw new Error("Usuário precisa confirmar o e-mail!");
    }

    const passwordMatches = await this.cryptographyService.compareData(
      existingUser.password,
      user.password
    );

    if (!passwordMatches) {
      throw new Error("Email ou senha inválidos!");
    }

    const token = this.jwtService.sign(existingUser);

    return { message: "Login feito com sucesso!" };
  }
}
