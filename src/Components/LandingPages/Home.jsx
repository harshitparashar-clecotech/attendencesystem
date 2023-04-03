import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import StopWatch from "../StopWatch/StopWatch";
import { Box, Container, Grid } from "@mui/material";

const Home = () => {
  const [data, setData] = useState("undefined");

  
  useEffect(() => {
    axios({ url: "http://localhost:4000/api/userData" }).then((res) => {
      setData(res.data.data);
    });
  }, []);


  return (
    <div>
      {/* <Navbar data={data} /> */}
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
