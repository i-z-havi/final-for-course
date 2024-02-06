import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

export default function Sandbox() {
  return (
    <>
      <Typography align='center' component='h1' variant='h2'>
        Sandbox
      </Typography>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>this is what buttons look like</p>
        <Button variant='contained'>Click me!</Button>
      </Container>  
      <Container sx={{ border: 1, width: 300, textAlign: 'center' }}>
        This is a Container
      </Container>
    </>
  )
}
