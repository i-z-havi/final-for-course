import { useLocalStorageUser } from "../../users/providers/UserProvider";
import { useForm } from "react-hook-form";
import usePolicy from "../hooks/usePolicy";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import FormTemplate from "../../forms/FormTemplate";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import LoadSpinner from "../../components/LoadSpinner";

export default function UpdatePolicyPage() {
  const { id } = useParams();
  const { isLoading, data, handleGetPolicy, handleUpdatePolicy } = usePolicy();
  const { user } = useLocalStorageUser();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: async () => {
      const data = await handleGetPolicy(id);
      if (data) {
        return {
          Title: data.title,
          Subtitle: data.subtitle,
          Description: data.description,
        };
      }
    },
  });
  const { register, handleSubmit, reset, formState, control } = form;
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

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  if (!isLoading && user.id !== data.creatorId)
    return <Navigate replace to={ROUTES.ROOT} />;

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
          <DevTool control={control} />
        </>
      ) : (
        <LoadSpinner />
      )}
    </>
  );
}
