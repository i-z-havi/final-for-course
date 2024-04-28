import React from 'react'
import FormTemplate from '../../forms/FormTemplate';
import { TextField } from '@mui/material';

export default function CreatePolicyForm() {
  return (
    <FormTemplate title='Create New Policy'>
      <TextField label='Title' name='title'/>
      <TextField label='Subtitle' name='Subtitle'/>
      <TextField label='Description' name='description' fullWidth multiline sx={{ m: 2 }} />
    </FormTemplate>
  )
}
