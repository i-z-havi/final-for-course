import { useCallback, useState } from "react";
import { useSnack } from "../../theme/Snackbar/SnackBarProvider";
import { createUser, deleteUser, getUser, getUsers, loginUser, updateUser } from "./useUserAPI";
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

  const handleDeleteUser = useCallback(
    async (id) => {
      try {
        await deleteUser(id);
        snack("success,Deletion successful!");
      } catch (error) {
        snack("error", error);
      }
    }, [snack]
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

  const handleUpdateUser = useCallback(
    async (id, updatedUser) => {
      try {
        const user = await updateUser(id, updatedUser);
        setUser(user);
        setLoading(false);
        snack("success", "User has been successfully updated!")
      } catch (error) {
        snack("error", error);
      }
    }, [setUser, snack]
  );

  const handleGetUser = useCallback(async (id) => {
    try {
      console.log("userUserHook:");
      console.log(id);
      const user = await getUser(id);
      console.log("User from userUserhook");
      console.log(user);
      setLoading(false);
      snack("success", "User retrieved successfully!");
      return user;
    } catch (error) {
      snack("error", error);
    }

  }, [snack]);

  const handleGetUsers = useCallback(async () => {
    try {
      const users = await getUsers();
      setData(users);
      setLoading(false)
      snack("success", "Users successfully retrieved!");
      setLoading(false);
      return users;
    } catch (error) {
      setLoading(false)
      snack("error", error);
    }
  }, [snack]);

  const handleLogout = useCallback(() => {
    setUser(null);
    removeToken();
    navigate(ROUTES.ROOT)
  }, [setUser, navigate]);

  return {
    data,
    loading,
    handleGetUser,
    handleLoginUser,
    handleCreateUser,
    handleUpdateUser,
    handleGetUsers,
    handleLogout,
    handleDeleteUser
  };
}
