import {  Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getPolicies } from '../hooks/usePolicyAPI';
import { useSnack } from '../../theme/Snackbar/SnackBarProvider';

export default function PoliciesPage() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const snack = useSnack();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const policiesData = await getPolicies();
                setData(policiesData);
                snack('success','petitions gained successfully')
            } catch (error) {
                console.error('Error fetching policies:', error);
                snack('error', error)
            } finally {
                setIsLoading(false); // Set isLoading to false regardless of success or failure
            }
        };

        fetchData(); // Call the fetchData function
    }, [snack]);

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
