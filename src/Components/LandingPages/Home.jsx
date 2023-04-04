import React from "react";
import StopWatch from "../StopWatch/StopWatch";
import { Box, Container, Grid } from "@mui/material";

const Home = () => {
 
  return (
    <div>
     
      <Container>
        <Box className="mt-lg landingPage">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <StopWatch/>
            </Grid>
         
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
