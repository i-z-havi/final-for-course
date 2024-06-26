import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import LoadSpinner from "../../components/LoadSpinner";
import FormTemplate from "../../forms/FormTemplate";
import ROUTES from "../../routes/routesModel";
import useUserHook from "../hooks/useUserHook";
import { useLocalStorageUser } from "../providers/UserProvider";

export default function EditUserPage() {
  const { loading, handleUpdateUser, handleGetUser } = useUserHook();
  const { user } = useLocalStorageUser();
  const [redirect, setRedirect] = useState(false);
  const [pfp, setPfp] = useState("");
  let data = null;
  const form = useForm({
    defaultValues: async () => {
      data = await handleGetUser(user.id);
      if (data) {
        setPfp(data.profile);
        return {
          FirstName: data.firstName,
          LastName: data.lastName,
          Email: data.email,
          Password: "",
        };
      }
      setRedirect(true);
    },
  });
  const { register, handleSubmit, reset, formState } = form;
  const { errors } = formState;
  const onReset = () => {
    reset();
  };

  const onSubmit = async (data) => {
    if (pfp === "") {
      errors.ProfilePicture.message = "Profile Picture is required!";
    } else {
      data.ProfilePicture = pfp;
      handleUpdateUser(data, user.id);
    }
  };

  const handleChange = (event) => {
    setPfp(event.target.value);
  };

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  if (redirect) return <Navigate replace to={ROUTES.ROOT} />;

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
                    alt="pic option 1"
                    src="/assets/images/pexels-altman-5499191.jpg"
                    sx={{ ml: "35%" }}
                  />
                </MenuItem>
                <MenuItem value="/assets/images/pexels-artempodrez-7048014.jpg">
                  <Avatar
                    alt="pic option 2"
                    src="/assets/images/pexels-artempodrez-7048014.jpg"
                    sx={{ ml: "35%" }}
                  />
                </MenuItem>
                <MenuItem value="/assets/images/pexels-roman-bengaiev-2198690-8446694.jpg">
                  <Avatar
                    alt="pic option 3"
                    src="/assets/images/pexels-roman-bengaiev-2198690-8446694.jpg"
                    sx={{ ml: "35%" }}
                  />
                </MenuItem>
              </Select>
            </FormControl>
          </FormTemplate>
        </>
      ) : (
        <LoadSpinner />
      )}
    </>
  );
}
