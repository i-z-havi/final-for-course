import React from 'react'
import FormTemplate from '../forms/FormTemplate'
import FormTextField from '../forms/FormTextField'
import { TextField } from '@mui/material'

export default function CreateUserPage() {
  return (
    <FormTemplate title='Create New User'>
        <FormTextField label='First Name' name='FirstName'/>
        <FormTextField label='Last Name' name='LastName'/>
        <FormTextField label='Email' name='Email'/>
        <TextField label='Password' name='Password' variant='outlined' type='password' sx={{ m: 2 }} />
    </FormTemplate>
  )
}
