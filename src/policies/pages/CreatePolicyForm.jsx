import { Container, Box, Typography, Grid, Divider } from '@mui/material'
import React from 'react'

export default function CreatePolicyForm() {
  return (
    <Container maxWidth='85vh'
      sx={{
        paddingTop: 8,
        justifyContent: "center",
        display: 'flex'
        // alignItems:'center',
      }}>
      <Box component='form'>
        <Typography variant='h4'>
          Test
        </Typography>
        <Divider />
      </Box>
      <Grid>
        <Grid item>
          
        </Grid>
      </Grid>
    </Container>
  )
}
