import React, { useEffect } from "react";
import FormTemplate from "../../forms/FormTemplate";
import initialPolicyForm from "../formhelper/initialPolicyForm";
import { FormControlLabel, TextField, Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import usePolicy from "../hooks/usePolicy";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { useSnack } from "../../theme/Snackbar/SnackBarProvider";

export default function CreatePolicyForm() {
  const form = useForm({ initialPolicyForm });

  const { register, handleSubmit, reset, formState } = form;
  const { handleCreatePolicy } = usePolicy();
  const { errors } = formState;
  const { user } = useLocalStorageUser();
  const navigate = useNavigate();
  const snack = useSnack();

  const onReset = () => {
    reset();
  };

  useEffect(() => {
    if (!user) {
      snack("error", "Must be logged in to create petition!");
      navigate(ROUTES.ROOT);
    }
  });

  const onSubmit = (data) => {
    data = { ...data, CreatorId: user.id };
    let details = [];
    for (const [key, value] of Object.entries(data.details)) {
      if (value) {
        details.push(key);
      }
    }
    data.details = details;
    handleCreatePolicy(data);
  };

  return (
    <>
      <FormTemplate
        title="Create New Policy"
        handleSubmit={handleSubmit(onSubmit)}
        handleReset={onReset}
      >
        <TextField
          label="Title"
          name="Title"
          {...register("Title", {
            required: "Title is required.",
            maxLength: { value: 450, message: "Only 450 characters allowed!" },
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
            maxLength: { value: 500, message: "Only 500 characters allowed!" },
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
          {...register("details.Left")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Right"
          name="Right"
          {...register("details.Right")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Social"
          name="Social"
          {...register("details.Social")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Economic"
          name="Economic"
          {...register("details.Economic")}
        />
      </FormTemplate>
    </>
  );
}
