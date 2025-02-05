import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post("/user/join", userData);

  return response.data;
};

export const resetRequest = async (data: SignupProps) => {
  const response = await httpClient.post("/user/reset", data);

  return response.data;
};

export const resetPassword = async (data: SignupProps) => {
  const response = await httpClient.put("/user/reset", data);

  return response.data;
};
