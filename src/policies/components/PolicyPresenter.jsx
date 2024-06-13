import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

export default function PolicyPresenter(policies) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(ROUTES.SPECIFIC_POLICY +'/'+ id);
  };

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
                maxHeight:"20vh"
              }}
            >
              <Typography variant='h4'>{policy.title}</Typography>
              <Typography variant='h6'
              sx={{
                mt:-1
              }}>{policy.title}</Typography>
              <Divider/>
              <Typography>{policy.description}</Typography>
              <Button onClick={()=>handleClick(policy.id)}>
                click
              </Button>
            </Stack>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
