import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({
    emp: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp: credentials.emp,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("UserValue", credentials.emp);
      console.log(localStorage.getItem("authToken"));
      navigate("/landing_page");
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box className="mt-lg Login">
      <Box className="Login-container">
        <form onSubmit={handleSubmit}>
          <Typography className="Heading">Login</Typography>
          <Box className="mt-sm">
            <TextField
              type="text"
              label="Employee Id"
              className="form-control"
              name="emp"
              fullWidth
              value={credentials.emp}
              onChange={onChange}
            />
          </Box>
          <Box className="mt-sm">
            <TextField
              fullWidth
              type="password"
              label="Password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </Box>
          <Box className="mt-sm">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
              className="dateContainer"
            >
              <Button variant="outlined" type="submit" className="checkIn-btn">
                Sign IN
              </Button>
              <Link to="/signup" className="New-User">
                New User ?
              </Link>
            </Stack>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
