import { useLocalStorageUser } from "../../users/providers/UserProvider";
import { useForm } from "react-hook-form";
import usePolicy from "../hooks/usePolicy";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import FormTemplate from "../../forms/FormTemplate";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import LoadSpinner from "../../components/LoadSpinner";
import { useEffect } from "react";
import { useSnack } from "../../theme/Snackbar/SnackBarProvider";

export default function UpdatePolicyPage() {
  const { id } = useParams();
  const { isLoading, data, handleGetPolicy, handleUpdatePolicy } = usePolicy();
  const { user } = useLocalStorageUser();
  const navigate = useNavigate();
  const snack = useSnack();

  useEffect(() => {
    if (!user) {
      snack("error", "You do not have permission to update this petition!");
      navigate(ROUTES.ROOT);
    }
    if (!isLoading && user.id !== data.creatorId) {
      snack("error", "You do not have permission to update this petition!");
      navigate(ROUTES.ROOT);
    }
  });

  const form = useForm({
    defaultValues: async () => {
      if (!user) {
        return null;
      }
      if (!isLoading && user.id !== data.creatorId) {
        return null;
      }
      const policyData = await handleGetPolicy(id);
      if (policyData) {
        return {
          Title: policyData.title,
          Subtitle: policyData.subtitle,
          Description: policyData.description,
        };
      }
    },
  });
  const { register, handleSubmit, reset, formState } = form;
  const { errors } = formState;
  const onReset = () => {
    reset();
  };

  const onSubmit = (updatedPolicy) => {
    let details = [];
    for (const [key, value] of Object.entries(updatedPolicy.Details)) {
      if (value) {
        details.push(key);
      }
    }
    updatedPolicy.Details = details;
    handleUpdatePolicy(data.id, updatedPolicy);
    navigate(ROUTES.ROOT);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <FormTemplate
            title="Update Policy"
            handleSubmit={handleSubmit(onSubmit)}
            handleReset={onReset}
          >
            <TextField
              label="Title"
              name="Title"
              {...register("Title", {
                required: "Title is required.",
                maxLength: {
                  value: 450,
                  message: "Only 450 characters allowed!",
                },
              })}
              error={!!errors.Title}
              helperText={errors.Title?.message}
              sx={{ m: 2 }}
            />
            <TextField
              label="Subtitle"
              name="Subtitle"
              {...register("Subtitle", {
                required: "Subitle is required.",
                maxLength: {
                  value: 500,
                  message: "Only 500 characters allowed!",
                },
              })}
              error={!!errors.Subtitle}
              helperText={errors.Subtitle?.message}
              sx={{ m: 2 }}
            />
            <TextField
              label="Description"
              name="Description"
              {...register("Description", {
                required: "Description is required.",
                maxLength: {
                  value: 4500,
                  message: "Only 4500 characters allowed!",
                },
              })}
              error={!!errors.Description}
              helperText={errors.Description?.message}
              fullWidth
              multiline
              sx={{ m: 2 }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Left"
              name="Left"
              {...register("Details.Left")}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Right"
              name="Right"
              {...register("Details.Right")}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Social"
              name="Social"
              {...register("Details.Social")}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Economic"
              name="Economic"
              {...register("Details.Economic")}
            />
          </FormTemplate>
        </>
      ) : (
        <LoadSpinner />
      )}
    </>
  );
}
