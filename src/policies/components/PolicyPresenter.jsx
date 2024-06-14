import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useLocalStorageUser } from "../../users/providers/UserProvider";

export default function PolicyPresenter(policies) {
  const navigate = useNavigate();
  const { user } = useLocalStorageUser();

  const handlePolicyClick = (id) => {
    navigate(ROUTES.SPECIFIC_POLICY + '/' + id);
  };

  const handleUpdateClick = (id) => {
    navigate(ROUTES.EDIT_PETITION + '/' + id)
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Stack>
          {policies.policies.map((policy) => (
            <Stack
              key={policy.id}
              sx={{
                width: "50vw",
                mt: 1,
                border: 1,
                borderRadius: 2,
                borderColor: "error.main",
                maxHeight: "20vh"
              }}
            >
              <Typography sx={{ ml: 1 }} variant='h4'>{policy.title}</Typography>
              <Typography variant='h6'
                sx={{
                  mt: -1,
                  ml: 1
                }}>{policy.title}</Typography>
              <Divider />
              <Typography sx={{ ml: 1 }}>{policy.description}</Typography>
              <Stack direction='row'
                sx={{
                  width: "50vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Button onClick={() => handlePolicyClick(policy.id)}
                  sx={{ width: (user && user.id === policy.creatorId) ? "50%" : "100%" }}>
                  To Petition
                </Button>
                {(user && user.id === policy.creatorId) ? <Button
                  sx={{ width: "50%" }}
                  onClick={() => handleUpdateClick(policy.id)}>
                  Update Petition
                </Button> : null}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
