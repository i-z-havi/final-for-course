import { Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import usePolicy from '../hooks/usePolicy';
import LoadSpinner from '../../components/LoadSpinner';
import PolicyPresenter from '../components/PolicyPresenter';

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
                <PolicyPresenter policies={data}/>
            )}
        </div>
    );
}
