import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React from 'react'


export default function Main({ children }) {
  const theme = useTheme();

  const bgStyle = {
    background: theme.palette.background.default,
  }

  return (
    <Box style={bgStyle} sx={{minHeight:"85vh"}}>
      {children}
    </Box>
  )
}
