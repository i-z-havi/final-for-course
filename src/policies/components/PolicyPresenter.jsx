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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import usePolicy from "../hooks/usePolicy";
import useSearch from "../hooks/useSearch";

export default function PolicyPresenter({ policies }) {
  const navigate = useNavigate();
  const { handleDeletePolicy } = usePolicy();
  const { user } = useLocalStorageUser();
  const { search, filterPolicies } = useSearch();
  const [details, setDetails] = useState([]);

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
    window.location.reload();
  };

  const handleDetailsChange = (detail, e) => {
    if (!details.includes(detail)) {
      setDetails([...details, detail]);
    } else {
      setDetails(details.filter((arrDetails) => arrDetails !== detail));
    }
  };

  return (
    <>
      {policies ? (
        <>
          <Box justifyContent="center" display="flex">
            <Grid
              container
              direction="row"
              justifyContent="center"
              spacing={0}
              sx={{ p: 3, maxWidth: "560px" }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Left"
                name="Left"
                onChange={(e) => handleDetailsChange("Left", e)}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Right"
                name="Right"
                onChange={(e) => handleDetailsChange("Right", e)}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Social"
                name="Social"
                onChange={(e) => handleDetailsChange("Social", e)}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Economic"
                name="Economic"
                onChange={(e) => handleDetailsChange("Economic", e)}
              />
            </Grid>
          </Box>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            sx={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <Stack>
                <Typography textAlign="center" fontStyle="italic">
                  Active policies are{" "}
                  <span style={{ color: "green" }}>green</span>, inactive are{" "}
                  <span style={{ color: "red" }}>red</span> and can only be seen in the "My Petitions" page (if you own them, that is!). 
                </Typography>
                <Typography textAlign="center" fontStyle="italic">
                  If the petition is inactive, wait for an admin to enable it!
                </Typography>
                {filterPolicies(policies, search, details).map((policy) => (
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
