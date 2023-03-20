import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { useStyles } from "@/src/styles";
import { useSelector } from "react-redux";

const SelectUser = ({ setUserId, userId, loading }) => {
  const classes = useStyles();
  const userData = useSelector((state) => state.users);

  return (
    <Fragment>
      {loading ? (
        <div className={classes.userLoader}>
          <CircularProgress
            sx={{
              marginTop: "200px",
            }}
          />
          <h4>Loading Users ...</h4>
        </div>
      ) : (
        <Box sx={{ minWidth: 120 }}>
          <h1>SELECT USER</h1>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">users</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userId}
              label="users"
              onChange={(event) => setUserId(event.target.value)}
            >
              {userData &&
                userData.users.map((user) => (
                  <MenuItem value={user.id} key={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Fragment>
  );
};

export default SelectUser;
