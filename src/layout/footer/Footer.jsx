import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ChecklistIcon from '@mui/icons-material/Checklist';

export default function Footer() {
  const navigate = useNavigate()

  return (
    <Box sx={{position:"sticky", bottom:0, left:0, right:0}}>
      <Paper elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Landing Page" icon={<ChecklistIcon/>} onClick={()=>navigate(ROUTES.ROOT)}/>
          <BottomNavigationAction label="Sandbox" icon={<TipsAndUpdatesIcon/>} onClick={() => navigate(ROUTES.SANDBOX)} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
