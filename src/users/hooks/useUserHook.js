import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ROUTES from "../../routes/routesModel";
import { useSnack } from "../../theme/Snackbar/SnackBarProvider";
import {
  getUserFromToken,
  removeToken,
  setTokenToLocalStorage,
} from "../../users/services/tokenService";
import { useLocalStorageUser } from "../providers/UserProvider";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} from "./useUserAPI";

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
        console.log("Received token:", token); // Debug log
        setTokenToLocalStorage(token);
        setToken(token);
        const user = getUserFromToken();
        console.log("Parsed user:", user); // Debug log
        setUser(user);
        navigate(ROUTES.ROOT);
        snack("success", "Login Successful!");
      } catch (error) {
        console.error("Login error:", error); // Debug log
        snack("error", error.toString());
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
    },
    [snack]
  );

  const handleCreateUser = useCallback(
    async (user) => {
      try {
        await createUser(user);
        await handleLoginUser({
          UserName: user.Email,
          Password: user.Password,
        });
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
        snack("success", "User has been successfully updated!");
      } catch (error) {
        snack("error", error);
      }
    },
    [setUser, snack]
  );

  const handleGetUser = useCallback(
    async (id) => {
      try {
        const user = await getUser(id);
        setLoading(false);
        snack("success", "User retrieved successfully!");
        return user;
      } catch (error) {
        setLoading(false);
        snack("error", error);
      }
    },
    [snack]
  );

  const handleGetUsers = useCallback(async () => {
    try {
      const users = await getUsers();
      setData(users);
      setLoading(false);
      snack("success", "Users successfully retrieved!");
      setLoading(false);
      return users;
    } catch (error) {
      setLoading(false);
      snack("error", error);
    }
  }, [snack]);

  const handleLogout = useCallback(() => {
    setUser(null);
    removeToken();
    navigate(ROUTES.ROOT);
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
    handleDeleteUser,
  };
}
