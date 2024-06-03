import { Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import usePolicy from '../hooks/usePolicy'

export default function MyPoliciesPage() {

    const { data, isLoading, handleGetMyPolicies } = usePolicy()
    useEffect(() => {
        handleGetMyPolicies()
    }, [handleGetMyPolicies])
  return (
    <div>
            <Typography variant='h1' align='center'>My Petitions</Typography>
            <Divider />
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                data.map((policy) => (
                    <Typography key={policy.id}>{policy.Title}</Typography>
                ))
            )}
        </div>
  )
}
