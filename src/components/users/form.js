import React, { Fragment } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useStyles } from "@/src/styles";
import Box from "@mui/material/Box";

const UserForm = ({
  formValues,
  setFormValues,
  handleSubmitUser,
  message,
  creating,
  userId,
  setUserId,
  setMessage,
}) => {
  const classes = useStyles();

  const backToCreate = () => {
    setUserId("");
    setFormValues({
      email: "",
      name: "",
      gender: "",
      status: "",
    });
    setMessage("CREATE USER");
  };

  return (
    <Fragment>
      <h1>{message}</h1>
      <form onSubmit={handleSubmitUser}>
        <TextField
          helperText=" "
          label="Email"
          fullWidth
          value={formValues.email}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              email: event.target.value,
            })
          }
        />
        <TextField
          helperText=" "
          label="Name"
          fullWidth
          value={formValues.name}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              name: event.target.value,
            })
          }
        />
        <TextField
          helperText=" "
          label="Gender"
          fullWidth
          value={formValues.gender}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              gender: event.target.value,
            })
          }
        />
        <TextField
          helperText=" "
          label="Status"
          fullWidth
          value={formValues.status}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              status: event.target.value,
            })
          }
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            xs={{
              width: "50%",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {creating ? (
              <CircularProgress
                size={30}
                thickness={4}
                sx={{ color: "white" }}
              />
            ) : (
              `${message} `
            )}
          </Button>
          {userId && (
            <Button
              type="button"
              variant="contained"
              xs={{
                width: "50%",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={backToCreate}
            >
              Back
            </Button>
          )}
        </Box>
      </form>
    </Fragment>
  );
};

export default UserForm;
