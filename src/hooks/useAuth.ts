import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { LoginProps } from "../pages/Login";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";

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

  return { userLogin };
};
