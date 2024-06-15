import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'

export default function About() {
    return (
        <Stack
            direction="column"
            alignItems='center'
        >
            <Typography variant='h1'>
                About
            </Typography>
            <Divider />
            <Typography textAlign='center'>
                This website was built to allow activists to show support for various policies that they might wish for the government to adopt.
                The idea is that the government can see not which GROUP to appeal to, but rather which specific POLICIES they might enact
                in order to convince the populace to vote for them. This helps the people have a higher influence on the government,
                incentivizing officials to pass policies they might otherwise be partial to in order to try and sway the voters to their side.
            </Typography>
        </Stack>
    )
}
