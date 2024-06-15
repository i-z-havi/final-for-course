import { useCallback, useState } from 'react'
import { useSnack } from '../../theme/Snackbar/SnackBarProvider';
import { allowPolicy, createPolicy, deletePolicy, getMyPolicies, getPendingPolicies, getPolicies, getPolicy, signPolicy, updatePolicy } from './usePolicyAPI';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import useAxios from '../../hooks/useAxios';

export default function usePolicy() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const snack = useSnack();
    const navigate = useNavigate()
    useAxios()

    const handleGetPolicies = useCallback(async () => {
        try {
            const policiesData = await getPolicies()
            setData(policiesData)
            setIsLoading(false)
            snack('success', 'Petitions fetched successfully!')
            return policiesData
        }
        catch {
            setIsLoading(false)
            snack('error', 'Error fetching petitions.')
        }
    }, [snack]);

    const handleGetPolicy = useCallback(async (id) => {
        try {
            const policyData = await getPolicy(id);
            setData(policyData);
            setIsLoading(false);
            snack('success', 'Policy retrieved successfully!');
            return (policyData);
        }
        catch {
            setIsLoading(false);
            snack('error', 'Error fetching petitions.');
        }
    }, [snack])

    const handleGetMyPolicies = useCallback(async () => {
        try {
            setIsLoading(true)
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

    const handleGetPendingPolicies = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await getPendingPolicies();
            setIsLoading(false)
            snack('success', 'Petitions fetched successfully!')
            setData(response)
            return response;
        } catch {
            setIsLoading(false)
            snack('error', 'Error fetching petitions.')
        }
    }, [snack])

    const handleCreatePolicy = useCallback(async (policy) => {
        try {
            await createPolicy(policy)
            snack('success', 'Petition created successfully!')
            navigate(ROUTES.ROOT)
        }
        catch (error) {
            snack('error', error)
        }
    }, [snack, navigate])

    const handleUpdatePolicy = useCallback(
        async (id, updatedPolicy) => {
            try {
                await updatePolicy(id, updatedPolicy);
                setIsLoading(false);
                snack("success", "Policy has been successfully updated!")
            } catch (error) {
                snack("error", error);
            }
        }, [snack]
    );

    const handleDeletePolicy = useCallback(
        async (id) => {
            try {
                await deletePolicy(id);
                setIsLoading(false)
                snack('success', 'Policy successfully deleted!')
            } catch (error) {
                snack('error', error)
            }
        }, [snack]
    )

    const handleSignPolicy = useCallback(async (policy, signed) => {
        try {
            await signPolicy(policy);
            if (!signed) {
                snack('success', 'Petition signed successfully!')
            }
            else {
                snack('success', 'Petition unsigned successfully!')
            }
        } catch (error) {
            snack('error', error)
        }
    }, [snack])

    const handleAllowPolicy = useCallback(async (policy) => {
        try {
            await allowPolicy(policy)
            snack('success', 'Petition allowed successfully!')
        }
        catch (error) {
            snack('error', error)
        }
    }, [snack])

    return {
        data,
        isLoading,
        handleGetPolicies,
        handleCreatePolicy,
        handleGetMyPolicies,
        handleGetPendingPolicies,
        handleAllowPolicy,
        handleGetPolicy,
        handleSignPolicy,
        handleUpdatePolicy,
        handleDeletePolicy
    }
}
