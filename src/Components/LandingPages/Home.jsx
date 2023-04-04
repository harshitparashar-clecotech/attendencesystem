import React from "react";
import StopWatch from "../StopWatch/StopWatch";
import { Box, Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.addEventListener("popstate", (e) => {
      if (!localStorage.getItem("authToken") == "") {
        e.preventDefault();
        e.target.history.go(1);
      }
    });
  }, []);

  const navigate =useNavigate()
  return (
    <div>
      <Container>
        <Box className="mt-lg landingPage">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              {localStorage.getItem("authToken") ? <StopWatch /> :navigate("/") }
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
