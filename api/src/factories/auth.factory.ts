import UserModel from "../database/models/User.model";
import UserService from "../services/Auth.service";
import AuthController from "../controllers/Auth.controller";

const userModel = new UserModel();
const userService = new UserService(userModel);
const authController = new AuthController(userService);

export default authController;
