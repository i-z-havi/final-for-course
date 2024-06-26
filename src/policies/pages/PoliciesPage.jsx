import {
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import usePolicy from "../hooks/usePolicy";
import LoadSpinner from "../../components/LoadSpinner.jsx";
import PolicyPresenter from "../components/PolicyPresenter.jsx";

export default function PoliciesPage() {
  const { data, isLoading, handleGetPolicies } = usePolicy();

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
          <PolicyPresenter policies={data} />
        </>
      )}
    </div>
  );
}
