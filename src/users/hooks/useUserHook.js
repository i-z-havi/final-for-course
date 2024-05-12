import { useCallback, useState } from 'react'
import { useSnack } from '../../theme/Snackbar/SnackBarProvider'
import { createUser, getUsers } from './useUserAPI';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';

export default function useUserHook() {
    const snack = useSnack();
    const [data, setData] = useState([])
    const navigate = useNavigate()

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

    const handleGetUsers = useCallback(async () => {
        try {
            const users = await getUsers();
            setData(users);
            snack('success', 'Users successfully retrieved!');
        }
        catch (error) {
            snack('error', error);
        }
    }, [snack])

    return {
        data,
        handleCreateUser,
        handleGetUsers
    }
}
