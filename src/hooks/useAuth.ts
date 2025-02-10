import { useNavigate } from "react-router-dom";
import { login, resetPassword, resetRequest } from "../api/auth.api";
import { signup } from "../api/auth.api";
import { LoginProps } from "../pages/Login";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { SignupProps } from "../pages/Signup";
import { useState } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();

  //메서드
  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token);

        showAlert("로그인 완료되었습니다.");
        navigate("/");
      },
      (error) => {
        showAlert("로그인 실패했습니다.");
      }
    );
  };

  const userSignUp = (data: SignupProps) => {
    signup(data).then((res) => {
      //성공
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  };

  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };

  const [resetRequested, setResetRequested] = useState(false);

  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };
  return { userLogin, userSignUp, userResetPassword, userResetRequest, resetRequested };
};
