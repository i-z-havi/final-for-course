import React from 'react'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import initialUserForm from '../formhelper/initialUserForm'
import { DevTool } from '@hookform/devtools'
import useUserHook from '../hooks/useUserHook'
import FormTemplate from '../../forms/FormTemplate'
import { useLocalStorageUser } from '../providers/UserProvider'
import { Navigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'

export default function CreateUserPage() {

  const form = useForm({ initialUserForm })
  const { register, handleSubmit, reset, formState, control } = form
  const { handleCreateUser } = useUserHook();
  const { errors } = formState
  const { user } = useLocalStorageUser();
  const onReset = () => {
    reset()
  }

  const onSubmit = (data) => {
    console.log(data);
    handleCreateUser(data)
  }

  if (user) return <Navigate replace to={ROUTES.ROOT} />

  return (
    <>
      <FormTemplate handleSubmit={handleSubmit(onSubmit)} handleReset={onReset} title='Create New User'>
        <TextField label='First Name' name='FirstName'
          {...register("FirstName", { required: "First Name is required." })}
          error={!!errors.FirstName}
          helperText={errors.FirstName?.message}
          sx={{ m: 2 }} />
        <TextField label='Last Name' name='LastName'
          {...register("LastName", { required: "Last Name is required." })}
          error={!!errors.LastName}
          helperText={errors.LastName?.message}
          sx={{ m: 2 }} />
        <TextField label='Email' name='Email'
          {...register("Email", { required: "Email is required.", pattern: { value: /^\S+@\S+$/i, message: "Email must be valid." } })}
          error={!!errors.Email}
          helperText={errors.Email?.message}
          sx={{ m: 2 }} />
        <TextField label='Password' name='Password' type='password'
          {...register("Password", { required: "Password is required." })}
          error={!!errors.Password}
          helperText={errors.Password?.message}
          sx={{ m: 2 }} />
        <input type='file' name='ProfilePicture' label='Profile Picture'
          {...register("ProfilePicture", { required: "Profile Picture is required!" })}
          sx={{ m: 2 }} />  
      </FormTemplate>
      <DevTool control={control} />
    </>
  )
}
