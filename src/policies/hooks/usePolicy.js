import { useCallback, useState } from 'react'
import { useSnack } from '../../theme/Snackbar/SnackBarProvider';
import { createPolicy, getMyPolicies, getPolicies } from './usePolicyAPI';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';

export default function usePolicy() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const snack = useSnack();
    const navigate = useNavigate()

    const handleGetPolicies = useCallback(async () => {
        try {
            const policiesData = await getPolicies()
            setData(policiesData)
            setIsLoading(false)
            snack('success', 'Petitions fetched successfully!')
        }
        catch {
            setIsLoading(false)
            snack('error', 'Error fetching petitions.')
        }
    }, [snack]);

    const handleGetMyPolicies = useCallback(async () => {
        try {
            const policiesData = await getMyPolicies()
            setData(policiesData)
            setIsLoading(false)
            snack('success', 'Petitions fetched successfully!')
        }
        catch {
            setIsLoading(false)
            snack('error', 'Error fetching petitions.')
        }
    }, [snack]);

    const handleCreatePolicy = useCallback(async (policy) => {
        try {
            await createPolicy(policy)
            snack('success', 'Petition created successfully!')
            navigate(ROUTES.ROOT)
        }
        catch(error) {
            snack('error', error)
        }
    }, [snack,navigate])

    return { data, isLoading, handleGetPolicies, handleCreatePolicy, handleGetMyPolicies }
}
