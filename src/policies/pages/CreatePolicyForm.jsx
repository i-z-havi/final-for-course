import React from 'react'
import FormTemplate from '../../forms/FormTemplate';
import FormTextField from '../../forms/FormTextField';
import { TextField } from '@mui/material';

export default function CreatePolicyForm() {
  return (
    <FormTemplate title='Create New Policy'>
      <FormTextField label='Title' name='Title'/>
      <FormTextField label='Subtitle' name='Subtitle'/>
      <TextField label='Description' name='description' variant='outlined' fullWidth multiline sx={{ m: 2 }} />
    </FormTemplate>
  )
}
