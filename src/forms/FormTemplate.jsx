import { Box, Typography, Grid, Divider, Button } from '@mui/material'
import LoopIcon from '@mui/icons-material/Loop';
import React from 'react'


export default function FormTemplate({ children, title, handleSubmit, handleReset }) {

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant='h4' align='center' sx={{ pt: 3, mb: 2 }}>
                {title}
            </Typography>
            <Divider />
            <Box justifyContent='center' display='flex'>
                <Grid container direction='row' justifyContent='center' spacing={0} sx={{ p: 3, maxWidth: '800px' }}>
                    {children}
                </Grid>
            </Box>
            <Box justifyContent='center' display='flex'>
                <Grid container direction='row' justifyContent='center' spacing={0} maxWidth='400px' sx={{ pt: 3 }} >
                    <Button type='submit' aria-label='submit' variant='contained' fullWidth sx={{ minWidth: '150px', m: 1 }}>
                        Submit
                    </Button>
                    <Button onClick={handleReset} aria-label='reset' variant='outlined' fullWidth sx={{ minWidth: '150px', m: 1 }}>
                        <LoopIcon />
                    </Button>
                </Grid>
            </Box>
        </form>
    )
}
