import { TextField } from '@mui/material'
import React from 'react'

export default function FormTextField({ label, name }) {
    return (
        <TextField label={label} name={name} variant='outlined' sx={{ m: 2 }} />
    )
}
