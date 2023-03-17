import AuthService, { IMessageResponse } from "../../services/Auth.service";
import { IUser } from "../../types/interfaces/IUser";
import { IModel } from "../../types/interfaces/IModel";
import { userMock } from "../ignore/mocks/user.mock";

describe("AuthService", () => {
  let authService: AuthService;
  let userModel: IModel<IUser>;

  beforeEach(() => {
    userModel = {
      create: jest.fn(),
      readOneByQuery: jest.fn(),
    };

    authService = new AuthService(userModel);
  });

  describe("register", () => {
    it("Deve cadastrar um novo usuário", async () => {
      const expectedResponse: IMessageResponse = {
        message: "Usuário cadastrado com sucesso!",
      };
      const mockExistingUser = null;
      const mockHashedPassword = "hashedPassword";
      const mockConfirmationToken = "confirmationToken";

      jest
        .spyOn(userModel, "readOneByQuery")
        .mockResolvedValue(mockExistingUser);
      jest
        .spyOn(authService.emailService, "sendConfirmationEmail")
        .mockResolvedValue(mockConfirmationToken);
      jest
        .spyOn(authService.cryptographyService, "encryptData")
        .mockResolvedValue(mockHashedPassword);
      jest.spyOn(userModel, "create").mockResolvedValue(userMock);

      const response = await authService.register(userMock);

      expect(response).toEqual(expectedResponse);

      expect(userModel.readOneByQuery).toHaveBeenCalledWith({
        email: userMock.email,
      });

      expect(
        authService.emailService.sendConfirmationEmail
      ).toHaveBeenCalledWith(userMock.email);

      expect(authService.cryptographyService.encryptData).toHaveBeenCalledWith(
        userMock.password
      );

      expect(userModel.create).toHaveBeenCalledWith({
        password: mockHashedPassword,
        confirmationToken: mockConfirmationToken,
        ...userMock,
      });
    });

    it("Deve gerar um erro se o usuário já existir", async () => {
      const mockExistingUser = userMock;

      jest
        .spyOn(userModel, "readOneByQuery")
        .mockResolvedValue(mockExistingUser);

      await expect(authService.register(userMock)).rejects.toThrowError(
        "Usuário já existe"
      );

      expect(userModel.readOneByQuery).toHaveBeenCalledWith({
        email: userMock.email,
      });
    });
  });

  describe("login", () => {
    const mockModel = {
      readOneByQuery: jest.fn(),
    };

    it("Deve gerar um erro caso o usuário não exista", async () => {
      const authService = new AuthService(mockModel);
      mockModel.readOneByQuery.mockReturnValueOnce(null);

      await expect(authService.login(userMock)).rejects.toThrow(
        "Email ou senha inválidos!"
      );
    });

    it("Deve lançar um erro se o usuário não tiver confirmado seu e-mail", async () => {
      const authService = new AuthService(mockModel);
      mockModel.readOneByQuery.mockReturnValueOnce({
        email: userMock.email,
        password: userMock.password,
        isActive: true,
      });

      await expect(authService.login(userMock)).rejects.toThrow(
        "Usuário precisa confirmar o e-mail!"
      );
    });

    it("Deve gerar um erro se a senha estiver incorreta", async () => {
      const authService = new AuthService(mockModel);
      mockModel.readOneByQuery.mockReturnValueOnce({
        email: userMock.email,
        password: "incorrectPassword",
        isActive: false,
      });

      await expect(authService.login(userMock)).rejects.toThrow(
        "Email ou senha inválidos!"
      );
    });

    it("Deve retornar uma mensagem de sucesso e um token se o login for bem-sucedido", async () => {
      const authService = new AuthService(mockModel);

      mockModel.readOneByQuery.mockReturnValueOnce({
        email: userMock.email,
        password: await authService.cryptographyService.encryptData(
          userMock.password
        ),
        isActive: false,
      });

      const result = await authService.login(userMock);

      expect(result).toEqual({ message: "Login feito com sucesso!" });

      expect(typeof authService.jwtService.sign).toBe("function");
    });
  });
});
