import { Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import usePolicy from '../hooks/usePolicy';

export default function PoliciesPage() {

    const { data, isLoading, handleGetPolicies } = usePolicy()
    useEffect(() => {
        handleGetPolicies()
    }, [handleGetPolicies])

    return (
        <div>
            <Typography variant='h1' align='center'>Petitions</Typography>
            <Divider />
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                data.map((policy) => (
                    <Typography key={policy.id}>{policy.title}</Typography> // Assuming policy has an id
                ))
            )}
        </div>
    );
}
