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

interface LoginResponse {
  token: string;
}

// 백엔드 서버에서 토큰을 원래 쿠키에 담아 보냈지만 바디에도 같이 보내주도록 수정함.
export const login = async (data: SignupProps) => {
  const response = await httpClient.post<LoginResponse>("/user/login", data);

  return response.data;
};
