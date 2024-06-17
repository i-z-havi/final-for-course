import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import usePolicy from "../hooks/usePolicy";
import LoadSpinner from "../../components/LoadSpinner.jsx";
import PolicyPresenter from "../components/PolicyPresenter.jsx";
import useSearch from "../hooks/useSearch.js";

export default function PoliciesPage() {
  const { data, isLoading, handleGetPolicies } = usePolicy();
  const { search, filterPolicies } = useSearch();
  const [details, setDetails] = useState([]);

  const handleDetailsChange = (detail, e) => {
    if (!details.includes(detail)) {
      setDetails([...details, detail]);
    } else {
      setDetails(details.filter((arrDetails) => arrDetails !== detail));
    }
  };

  useEffect(() => {
    handleGetPolicies();
  }, [handleGetPolicies]);

  return (
    <div>
      <Typography variant="h1" align="center">
        Petitions
      </Typography>
      <Divider />
      {isLoading ? (
        <LoadSpinner />
      ) : (
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
                //for some reason, onclick made it fire off twice, and onchange doesnt
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
          <PolicyPresenter policies={filterPolicies(data, search, details)} />
        </>
      )}
    </div>
  );
}
