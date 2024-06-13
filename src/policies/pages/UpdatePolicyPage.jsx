import React, { useState } from "react";
import { useLocalStorageUser } from "../../users/providers/UserProvider";
import { useForm } from "react-hook-form";
import useUserHook from "../../users/hooks/useUserHook";
import usePolicy from "../hooks/usePolicy";
import { Navigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import FormTemplate from "../../forms/FormTemplate";
import { TextField } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import LoadSpinner from "../../components/LoadSpinner";

export default function UpdatePolicyPage() {
  const { id } = useParams();
  const { loading, handleGetUser } = useUserHook();
  const { isLoading, handleGetPolicy } = usePolicy();
  const { user } = useLocalStorageUser();
  const [pfp, setPfp] = useState("");
  const form = useForm({
    defaultValues: async () => {
      const data = await handleGetPolicy(id);
      setPfp(data.profile);
      console.log(data);
      return {
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.email,
        Password: "",
      };
    },
  });
  const { register, handleSubmit, reset, formState, control } = form;
  const { errors } = formState;
  const onReset = () => {
    reset();
  };

  const onSubmit = async (data) => {};

  const handleChange = (event) => {
    setPfp(event.target.value);
  };

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <>
      {!loading ? (
        <>
          <FormTemplate
            handleSubmit={handleSubmit(onSubmit)}
            handleReset={onReset}
            title="Edit User"
          >
            <TextField
              label="First Name"
              name="FirstName"
              {...register("FirstName", {
                required: "First Name is required.",
              })}
              error={!!errors.FirstName}
              helperText={errors.FirstName?.message}
              sx={{ m: 2 }}
            />
            <TextField
              label="Last Name"
              name="LastName"
              {...register("LastName", { required: "Last Name is required." })}
              error={!!errors.LastName}
              helperText={errors.LastName?.message}
              sx={{ m: 2 }}
            />
            <TextField
              label="Email"
              name="Email"
              {...register("Email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email must be valid.",
                },
              })}
              error={!!errors.Email}
              helperText={errors.Email?.message}
              sx={{ m: 2 }}
            />
            <TextField
              label="Password"
              name="Password"
              type="password"
              {...register("Password", { required: "Password is required." })}
              error={!!errors.Password}
              helperText={errors.Password?.message}
              sx={{ m: 2 }}
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
