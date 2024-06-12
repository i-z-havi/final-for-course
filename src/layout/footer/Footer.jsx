import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import HouseIcon from '@mui/icons-material/House';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useLocalStorageUser } from '../../users/providers/UserProvider';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditIcon from '@mui/icons-material/Edit';

export default function Footer() {
  const navigate = useNavigate()
  const { user } = useLocalStorageUser();

  return (
    <Box sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}>
      <Paper elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Landing Page"
            icon={<HouseIcon />}
            onClick={() => navigate(ROUTES.ROOT)}
          />
          <BottomNavigationAction
            label="All Petitions"
            icon={<ChecklistIcon />}
            onClick={() => navigate(ROUTES.POLICY_PAGE)}
          />
          <BottomNavigationAction
            label="Sandbox"
            icon={<TipsAndUpdatesIcon />}
            onClick={() => navigate(ROUTES.SANDBOX)}
            sx={{ display: user && user.isAdmin ? 'inline-flex' : 'none' }}
          />
          <BottomNavigationAction
            label="New Petition"
            icon={<AddBoxIcon />}
            onClick={() => navigate(ROUTES.CREATE_POLICY)}
            sx={{ display: user ? 'inline-flex' : 'none' }}
          />
          <BottomNavigationAction
            label="My Petitions"
            icon={<CheckCircleIcon />}
            onClick={() => navigate(ROUTES.MY_POLICIES)}
            sx={{ display: user ? 'inline-flex' : 'none' }}
          />
          <BottomNavigationAction
            label="Pending Petitions"
            icon={<TipsAndUpdatesIcon />}
            onClick={() => navigate(ROUTES.PENDING_POLICIES)} //update later 
            sx={{ display: user && user.isAdmin ? 'inline-flex' : 'none' }}
          />
          <BottomNavigationAction
            label="New User"
            icon={<PersonAddIcon />}
            onClick={() => navigate(ROUTES.CREATE_USER)}
            sx={{ display: !user ? 'inline-flex' : 'none' }}
          />
          <BottomNavigationAction
            label="Edit User"
            icon={<EditIcon />}
            onClick={() => navigate(ROUTES.EDIT_USER)}
            sx={{ display: user ? 'inline-flex' : 'none' }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
