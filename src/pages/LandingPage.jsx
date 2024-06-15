import { Container, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

export default function LandingPage() {
  return (
    <Container>
      <Typography variant='h1' align='center' sx={{ pt: 3 }}>
        Petitions for the People
      </Typography>
      <Typography variant='h5' align='center' fontStyle='italic'>
        A site to make your voice heard!
      </Typography>
      <Divider />
      <Stack
        direction="column"
        alignItems='center'
      >
        <Typography textAlign='center'>
          People's Petitions is a site built for making sure that the voices of the people are heard. We have been (and currently are)
          going through tough, complex times. Now more then ever, it is important for the people in power to hear our voices. This site
          was built to make that process simpler efficient.
        </Typography>
        <br/>
        <Typography fontStyle='italic' fontWeight='bold'>
          Make Your Voice Heard!
        </Typography>
        <br/>
        <img src='../assets/images/1024px-Knesset_Israeli_Parliament_Building_(41404895850).jpg' alt='Knesset'/>
      </Stack>
    </Container>
  )
}
