import { IUser } from "../../../types/interfaces/IUser";

export const userMock: IUser = {
  email: "test@test.com",
  password: "testPassword",
  firstName: "John",
  lastName: "Doe",
  avatar: "",
  gender: "male",
  dateOfBirth: new Date(),
};
