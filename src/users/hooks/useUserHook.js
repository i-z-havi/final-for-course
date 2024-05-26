import { useCallback, useState } from 'react'
import { useSnack } from '../../theme/Snackbar/SnackBarProvider'
import { createUser, getUsers, loginUser } from './useUserAPI';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import useAxios from '../../hooks/useAxios';
import { setToken } from '../../users/services/tokenService'

export default function useUserHook() {
    const snack = useSnack();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useAxios()

    const handleCreateUser = useCallback(async (user) => {
        try {
            await createUser(user)
            snack('success', 'User successfully created!')
            navigate(ROUTES.ROOT)
        }
        catch (error) {
            snack('error', error)
        }
    }, [snack, navigate])

    const handleLoginUser = useCallback(async (loginModel) => {
        try {
            const token = await loginUser(loginModel)
            setToken(token);
            snack('success', 'Login Successful!')
        }
        catch (error) {
            snack('error', error)
        }
    },[snack])

    const handleGetUsers = useCallback(async () => {
        try {
            const users = await getUsers();
            setData(users);
            snack('success', 'Users successfully retrieved!');
            setLoading(false)
        }
        catch (error) {
            snack('error', error);
        }
    }, [snack])

    return {
        data,
        loading,
        handleLoginUser,
        handleCreateUser,
        handleGetUsers
    }
}
