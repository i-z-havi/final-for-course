import React from "react";
import FormTemplate from "../../forms/FormTemplate";
import initialLoginForm from "../formhelper/initialLoginForm";
import { useForm } from "react-hook-form";
import useUserHook from "../hooks/useUserHook";
import { TextField } from "@mui/material";

export default function LoginPage() {
  const form = useForm({ initialLoginForm });
  const { register, handleSubmit, reset, formState } = form;
  const { handleLoginUser } = useUserHook();
  const { errors } = formState;

  const onReset = () => {
    reset();
  };

  const onSubmit = (data) => {
    handleLoginUser(data);
  };

  return (
    <>
      <FormTemplate
        handleSubmit={handleSubmit(onSubmit)}
        handleReset={onReset}
        title="Login"
      >
        <TextField
          label="Email"
          name="UserName"
          {...register("UserName", {
            required: "Email is required.",
            pattern: { value: /^\S+@\S+$/i, message: "Email must be valid." },
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
    </>
  );
}
