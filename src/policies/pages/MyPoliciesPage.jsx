import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import usePolicy from "../hooks/usePolicy";
import LoadSpinner from "../../components/LoadSpinner";
import PolicyPresenter from "../components/PolicyPresenter";
import useSearch from "../hooks/useSearch";

export default function PoliciesPage() {
  const { data, isLoading, handleGetMyPolicies } = usePolicy();
  const { search, filterPolicies } = useSearch();

  useEffect(() => {
    handleGetMyPolicies();
  }, [handleGetMyPolicies]);

  return (
    <div>
      <Typography variant="h1" align="center">
        My Petitions
      </Typography>
      <Divider />
      {isLoading ? (
        <LoadSpinner />
      ) : (
        <PolicyPresenter policies={filterPolicies(data, search)} />
      )}
    </div>
  );
}
