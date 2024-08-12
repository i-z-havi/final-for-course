import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import React from "react";
import ROUTES from "../../routes/routesModel";
import HouseIcon from "@mui/icons-material/House";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ChecklistIcon from "@mui/icons-material/Checklist";
import InfoIcon from "@mui/icons-material/Info";

export default function Footer() {
  const navigate = useNavigate();
  const { user } = useLocalStorageUser();

  return (
    <Box sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}>
      <Paper elevation={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => navigate(ROUTES.ROOT)}
            sx={{
              position: "sticky",
              display: { sm: "none", xs: "none", md: "inline-flex" },
            }}
          >
            <img src="../../favicon.ico" alt="Icon" width={32} height={32} />
          </IconButton>
          <BottomNavigation showLabels sx={{ minWidth: "75vw" }}>
            <BottomNavigationAction
              label="Home Page"
              icon={<HouseIcon />}
              onClick={() => navigate(ROUTES.ROOT)}
            />
            <BottomNavigationAction
              label="All Petitions"
              icon={<ChecklistIcon />}
              onClick={() => navigate(ROUTES.POLICY_PAGE)}
            />
            <BottomNavigationAction
              label="About"
              icon={<InfoIcon />}
              onClick={() => navigate(ROUTES.ABOUT)}
            />
            <BottomNavigationAction
              label="New Petition"
              icon={<AddBoxIcon />}
              onClick={() => navigate(ROUTES.CREATE_POLICY)}
              sx={{ display: user ? "inline-flex" : "none" }}
            />
            <BottomNavigationAction
              label="My Petitions"
              icon={<CheckCircleIcon />}
              onClick={() => navigate(ROUTES.MY_POLICIES)}
              sx={{ display: user ? "inline-flex" : "none" }}
            />
            <BottomNavigationAction
              label="Pending Petitions"
              icon={<TipsAndUpdatesIcon />}
              onClick={() => navigate(ROUTES.PENDING_POLICIES)}
              sx={{ display: user && user.isAdmin ? "inline-flex" : "none" }}
            />
            <BottomNavigationAction
              label="New User"
              icon={<PersonAddIcon />}
              onClick={() => navigate(ROUTES.CREATE_USER)}
              sx={{ display: !user ? "inline-flex" : "none" }}
            />
            <BottomNavigationAction
              label="Manage Users"
              icon={<PersonRemoveIcon />}
              onClick={() => navigate(ROUTES.DELETE_USERS)}
              sx={{ display: user && user.isAdmin ? "inline-flex" : "none" }}
            />
            <BottomNavigationAction
              label="Manage Petitions"
              icon={<DeleteForeverIcon />}
              onClick={() => navigate(ROUTES.MANAGE_POLICIES)}
              sx={{ display: user && user.isAdmin ? "inline-flex" : "none" }}
            />
          </BottomNavigation>
          <Stack
            direction="row"
            sx={{
              position: "sticky",
              mr: "2vw",
              display: { sm: "none", xs: "none", md: "inline-flex" },
            }}
          >
            <Stack direction="column">
              <Typography>
                <a href="mailto:itay.s.zehavi@gmail.com">Email Me!</a>
              </Typography>
              <Typography
                sx={{
                  textDecoration: "underline",
                  fontStyle: "italic",
                  color: "secondary",
                }}
                textAlign="center"
                fontSize="1.5vh"
              >
                Made by Itay Zehavi
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
