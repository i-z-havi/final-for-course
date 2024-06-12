import { Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import usePolicy from '../hooks/usePolicy';
import LoadSpinner from '../../components/LoadSpinner';

export default function PendingPoliciesPage() {
    const { data, isLoading, handleGetPendingPolicies } = usePolicy()
    useEffect(() => {
        handleGetPendingPolicies()
    }, [handleGetPendingPolicies])

    return (
        <div>
            <Typography variant='h1' align='center'>Pending Petitions</Typography>
            <Divider />
            {isLoading ? (
                <LoadSpinner/>
            ) : (
                data.map((policy) => (
                    <Typography key={policy.id}>{policy.title}</Typography> // Assuming policy has an id
                ))
            )}
        </div>
    );
}
