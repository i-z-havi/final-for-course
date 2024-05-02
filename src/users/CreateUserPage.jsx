import React from 'react'
import FormTemplate from '../forms/FormTemplate'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import initialUserForm from './formhelper/initialUserForm'
import { DevTool } from '@hookform/devtools'

export default function CreateUserPage() {

  const form = useForm({ initialUserForm })

  const { register, handleSubmit, reset, formState, control } = form
  const { errors } = formState

  const onReset = () => {
    reset()
  }

  const onSubmit = (data) => {
    console.log(data)
  }

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
      </FormTemplate>
      <DevTool control={control} />
    </>
  )
}
