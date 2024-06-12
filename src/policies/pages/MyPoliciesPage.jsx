import { Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import usePolicy from '../hooks/usePolicy';
import LoadSpinner from '../../components/LoadSpinner';

export default function PoliciesPage() {
    const { data, isLoading, handleGetMyPolicies } = usePolicy()
    useEffect(() => {
        handleGetMyPolicies()
    }, [handleGetMyPolicies])

    return (
        <div>
            <Typography variant='h1' align='center'>My Petitions</Typography>
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
