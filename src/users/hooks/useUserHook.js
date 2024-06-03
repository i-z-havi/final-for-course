import { useCallback, useState } from "react";
import { useSnack } from "../../theme/Snackbar/SnackBarProvider";
import { createUser, getUsers, loginUser } from "./useUserAPI";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useAxios from "../../hooks/useAxios";
import {
  getUserFromToken,
  removeToken,
  setTokenToLocalStorage,
} from "../../users/services/tokenService";
import { useLocalStorageUser } from "../providers/UserProvider";

export default function useUserHook() {
  const snack = useSnack();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setToken, setUser } = useLocalStorageUser();
  const navigate = useNavigate();
  useAxios();

  const handleLoginUser = useCallback(
    async (loginModel) => {
      try {
        const token = await loginUser(loginModel);
        setTokenToLocalStorage(token);
        setToken(token);
        const user = getUserFromToken();
        setUser(user);
        navigate(ROUTES.ROOT);
        snack("success", "Login Successful!");
      } catch (error) {
        snack("error", error);
      }
    },
    [setToken, setUser, snack, navigate]
  );

  const handleCreateUser = useCallback(
    async (user) => {
      try {
        await createUser(user);
        await handleLoginUser({ UserName: user.Email, Password: user.Password });
        navigate(ROUTES.ROOT);
      } catch (error) {
        snack("error", error);
      }
    },
    [snack, navigate, handleLoginUser]
  );

  const handleGetUsers = useCallback(async () => {
    try {
      const users = await getUsers();
      setData(users);
      snack("success", "Users successfully retrieved!");
      setLoading(false);
    } catch (error) {
      snack("error", error);
    }
  }, [snack]);

  const handleLogout = useCallback(() => {
    setUser(null);
    removeToken();
  }, [setUser]);

  return {
    data,
    loading,
    handleLoginUser,
    handleCreateUser,
    handleGetUsers,
    handleLogout,
  };
}
