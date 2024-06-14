import React from 'react'
import FormTemplate from '../../forms/FormTemplate';
import initialPolicyForm from '../formhelper/initialPolicyForm';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import usePolicy from '../hooks/usePolicy';
import { useLocalStorageUser } from '../../users/providers/UserProvider';
import ROUTES from '../../routes/routesModel';
import { Navigate } from 'react-router-dom';

export default function CreatePolicyForm() {

  const form = useForm({ initialPolicyForm })

  const { register, handleSubmit, reset, formState, control } = form
  const { handleCreatePolicy } = usePolicy();
  const { errors } = formState
  const { user } = useLocalStorageUser();

  const onReset = () => {
    reset();
  }

  const onSubmit = (data) => {
    data = { ...data, "CreatorId": user.id }
    handleCreatePolicy(data);
  }

  if (!user) return <Navigate replace to={ROUTES.ROOT} />

  return (
    <>
      <FormTemplate title='Create New Policy' handleSubmit={handleSubmit(onSubmit)} handleReset={onReset}>
        <TextField label='Title' name='Title'
          {...register("Title", { required: "Title is required.", maxLength: { value: 450, message: "Only 450 characters allowed!" } })}
          error={!!errors.Title}
          helperText={errors.Title?.message}
          sx={{ m: 2 }} />
        <TextField label='Subtitle' name='Subtitle'
          {...register("Subtitle", {
            required: "Subitle is required.",
            maxLength: { value: 500, message: "Only 500 characters allowed!" }
          })}
          error={!!errors.Subtitle}
          helperText={errors.Subtitle?.message}
          sx={{ m: 2 }} />
        <TextField label='Description' name='Description'
          {...register("Description", { required: "Description is required.", maxLength: { value: 4500, message: "Only 4500 characters allowed!" } })}
          error={!!errors.Description}
          helperText={errors.Description?.message}
          fullWidth multiline sx={{ m: 2 }} />
      </FormTemplate>
      <DevTool control={control} />
    </>
  )
}
