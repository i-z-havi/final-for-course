import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import usePolicy from "../hooks/usePolicy";

export default function PolicyPresenter(policies) {
  const navigate = useNavigate();
  const { handleDeletePolicy } = usePolicy();
  const { user } = useLocalStorageUser();

  const handlePolicyClick = (id) => {
    navigate(ROUTES.SPECIFIC_POLICY + "/" + id);
  };

  const handleUpdateClick = (id) => {
    navigate(ROUTES.EDIT_PETITION + "/" + id);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this petition?")) {
      handleDeletePolicy(id);
    }
  };

  return (
    <>
      {policies.policies.length !== 0 ? (
        <>
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
                      borderColor: policy.isActive
                        ? "success.main"
                        : "error.main",
                      maxHeight: "20vh",
                    }}
                  >
                    <Typography sx={{ ml: 1 }} variant="h4">
                      {policy.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: -1,
                        ml: 1,
                      }}
                    >
                      {policy.title}
                    </Typography>
                    <Divider />
                    <Typography sx={{ ml: 1 }}>{policy.description}</Typography>
                    <Stack
                      direction="row"
                      sx={{
                        width: "50vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={() => handlePolicyClick(policy.id)}
                        sx={{
                          width:
                            user && user.id === policy.creatorId
                              ? "33%"
                              : "100%",
                        }}
                      >
                        To Petition
                      </Button>
                      {user && user.id === policy.creatorId ? (
                        <>
                          <Button
                            sx={{ width: "33%" }}
                            onClick={() => handleUpdateClick(policy.id)}
                          >
                            Update Petition
                          </Button>
                          <Button
                            sx={{ width: "33%" }}
                            onClick={() => handleDeleteClick(policy.id)}
                          >
                            Delete Petition
                          </Button>
                        </>
                      ) : null}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </>
      ) : (
        <Stack direction="column" alignItems="center">
          <br />
          <img
            src="../assets/images/128px-Icon-round-Question_mark.svg.png"
            alt="noItemsFound"
          />
          <br />
          <Typography>No Petitions Found!</Typography>
        </Stack>
      )}
    </>
  );
}
