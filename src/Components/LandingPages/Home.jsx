import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import StopWatch from "../StopWatch/StopWatch";
import { Box } from "@mui/material";

const Home = () => {
  const [data, setData] = useState("undefined");

  const [time, setTime] = useState([]);
  useEffect(() => {
    axios({ url: "http://localhost:4000/api/userData" }).then((res) => {
      setData(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios({ url: "http://localhost:4000/api/userTime" }).then((res) => {
      setTime(res.data);
    });
  });

  return (
    <div>
      <Navbar />
      {data?.name}

      {time?.data?.map((times) => (
        <Box sx={{ marginTop: "1rem" }}>
          <Box>
            Time = {times?.time}
          </Box>
          <Box>
            EndTime = {times?.endtime}
          </Box>
          <Box>
            Duration = {times?.duration?.hours}:{times?.duration?.minutes}:
            {times?.duration?.seconds}
          </Box>
          <Box>
            {times?.date?.day}-{times?.date?.month}-{times?.date?.year}
          </Box>
          Location ={times?.location}
        </Box>
      ))}
      <Box sx={{ marginTop: "2rem" }}>
        <StopWatch />
      </Box>
    </div>
  );
};

export default Home;
