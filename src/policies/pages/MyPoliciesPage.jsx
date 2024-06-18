import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import usePolicy from "../hooks/usePolicy";
import LoadSpinner from "../../components/LoadSpinner";
import PolicyPresenter from "../components/PolicyPresenter";
import { useSnack } from "../../theme/Snackbar/SnackBarProvider";
import { useNavigate } from "react-router-dom";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesModel";

export default function PoliciesPage() {
  const { data, isLoading, handleGetMyPolicies } = usePolicy();
  const { user } = useLocalStorageUser();
  const snack = useSnack();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      handleGetMyPolicies();
    } else {
      snack("error", "Only users can see their own policies!");
      navigate(ROUTES.ROOT);
    }
  }, [handleGetMyPolicies, navigate, snack, user]);

  return (
    <div>
      <Typography variant="h1" align="center">
        My Petitions
      </Typography>
      <Divider />
      {isLoading ? <LoadSpinner /> : <PolicyPresenter policies={data} />}
    </div>
  );
}
