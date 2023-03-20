import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import UserForm from "./form";
import SelectUser from "./selectUser";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  createUser,
  getUsers,
  updateUser,
  UserDetails,
} from "./../../../src/redux/reducers";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Users = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("CREATE USER");
  const [userId, setUserId] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserDetails();
    } else {
      return;
    }
  }, [userId]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios({
        url: "https://gorest.co.in/public/v2/users",
        method: "GET",
      });

      dispatch(getUsers(data));
      setLoading(false);
    } catch (err) {
      console.log("Error", err);
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      if (!userId) return;

      setLoading(true);
      const { data } = await axios({
        url: `https://gorest.co.in/public/v2/users/${userId}`,
        method: "GET",
      });

      data && setFormValues(data);

      data && dispatch(UserDetails(data));
      data && setMessage("EDIT USER");
      setLoading(false);
    } catch (err) {
      console.log("Error getting user details", err);
      setLoading(false);
    }
  };

  const handleSubmitUser = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setCreating(true);
      const { data } = await axios({
        url: "https://gorest.co.in/public/v2/users",
        method: "POST",
        data: {
          ...formValues,
        },
        params: {
          "access-token": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      });

      data && dispatch(createUser(data));
      data && setLoading(false);
      data && setCreating(false);
      data && toast.success("Successfully created 👍");
      setFormValues({
        email: "",
        name: "",
        gender: "",
        status: "",
      });
    } catch (err) {
      console.log("ERROR CREATING USER", err);
      setLoading(false);
      setCreating(false);
      if (err.response.data?.length) {
        toast.error(err.response.data[0].message);
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    try {
      if (!userId) return;
      setLoading(true);
      const { data } = await axios({
        url: `https://gorest.co.in/public/v2/users/${userId}`,
        method: "PATCH",
        data: {
          ...formValues,
        },
        params: {
          "access-token": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      });
      data && setLoading(false);
      data && dispatch(updateUser(data));
      toast.success("UPDATED SUCCESSFUL");
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Item elevation={0}>
            <SelectUser
              formValues={formValues}
              setFormValues={setFormValues}
              setUserId={setUserId}
              userId={userId}
              loading={loading}
            />
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Item elevation={0}>
            <UserForm
              formValues={formValues}
              setFormValues={setFormValues}
              handleSubmitUser={userId ? handleUpdateUser : handleSubmitUser}
              message={message}
              setMessage={setMessage}
              creating={creating}
              userId={userId}
              setUserId={setUserId}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Users;
