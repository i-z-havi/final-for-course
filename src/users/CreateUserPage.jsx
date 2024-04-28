import React from 'react'
import FormTemplate from '../forms/FormTemplate'
import FormTextField from '../forms/FormTextField'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function CreateUserPage() {

  const form = useForm({})

  return (
    <FormTemplate title='Create New User'>
        <FormTextField label='First Name' name='FirstName'/>
        <FormTextField label='Last Name' name='LastName'/>
        <FormTextField label='Email' name='Email'/>
        <TextField label='Password' name='Password' type='password' sx={{ m: 2 }} />
    </FormTemplate>
  )
}
