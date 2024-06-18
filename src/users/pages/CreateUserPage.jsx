import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormTemplate from "../../forms/FormTemplate";
import ROUTES from "../../routes/routesModel";
import { useSnack } from "../../theme/Snackbar/SnackBarProvider";
import initialUserForm from "../formhelper/initialUserForm";
import useUserHook from "../hooks/useUserHook";
import { useLocalStorageUser } from "../providers/UserProvider";

export default function CreateUserPage() {
  const [pfp, setPfp] = useState("");
  const form = useForm({ initialUserForm });
  const { register, handleSubmit, reset, formState } = form;
  const { handleCreateUser } = useUserHook();
  const { errors } = formState;
  const { user } = useLocalStorageUser();
  const navigate = useNavigate();
  const snack = useSnack();
  const onReset = () => {
    reset();
  };

  useEffect(() => {
    if (user) {
      snack("error", "You are already logged in!");
      navigate(ROUTES.ROOT);
    }
  });

  const onSubmit = async (data) => {
    if (pfp === "") {
      errors.ProfilePicture.message = "Profile Picture is required!";
    }
    handleCreateUser(data);
  };

  const handleChange = (event) => {
    setPfp(event.target.value);
  };

  return (
    <>
      <FormTemplate
        handleSubmit={handleSubmit(onSubmit)}
        handleReset={onReset}
        title="Create New User"
      >
        <TextField
          label="First Name"
          name="FirstName"
          {...register("FirstName", { required: "First Name is required." })}
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
        <FormControl sx={{ minWidth: "155px" }}>
          <InputLabel id="pfp">Profile Picture</InputLabel>
          <Select
            {...register("ProfilePicture", {
              required: "Profile Picture is required!",
            })}
            id="ProfilePicture"
            labelId="pfp"
            label="Profile Picture"
            onChange={handleChange}
            value={pfp}
            error={!!errors.ProfilePicture}
          >
            <MenuItem value="/assets/images/pexels-altman-5499191.jpg">
              <Avatar
                alt="profile picture option 1"
                src="/assets/images/pexels-altman-5499191.jpg"
                sx={{ ml: "35%" }}
              />
            </MenuItem>
            <MenuItem value="/assets/images/pexels-artempodrez-7048014.jpg">
              <Avatar
                alt="profile picture option 2"
                src="/assets/images/pexels-artempodrez-7048014.jpg"
                sx={{ ml: "35%" }}
              />
            </MenuItem>
            <MenuItem value="/assets/images/pexels-roman-bengaiev-2198690-8446694.jpg">
              <Avatar
                alt="profile picture option 3"
                src="/assets/images/pexels-roman-bengaiev-2198690-8446694.jpg"
                sx={{ ml: "35%" }}
              />
            </MenuItem>
          </Select>
        </FormControl>
      </FormTemplate>
    </>
  );
}
