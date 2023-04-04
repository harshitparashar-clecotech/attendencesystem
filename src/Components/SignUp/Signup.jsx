import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    emp: "",
    password: "",
    geolocation: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        emp: credentials.emp,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box className="mt-lg Signup">
      <Box className="Signup-container">
        <form onSubmit={handleSubmit}>
          <Typography className="Heading">Sign Up</Typography>
          <Box className="mt-sm">
            <TextField
              variant="outlined"
              label="User Name"
              type="text"
              name="name"
              fullWidth
              value={credentials.name}
              onChange={onChange}
              className="form-control"
            />
          </Box>
          <Box className="mt-sm">
            <TextField
              variant="outlined"
              label="Employe Id"
              type="text"
              fullWidth
              className="form-control"
              name="emp"
              value={credentials.emp}
              onChange={onChange}
            />
          </Box>
          <Box className="mt-sm">
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </Box>
          <Box className="mt-sm">
            <TextField
              variant="outlined"
              label="Location"
              fullWidth
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </Box>
          <Box className="center mt-sm">
            <Button variant="outlined" type="submit" className="checkIn-btn">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
