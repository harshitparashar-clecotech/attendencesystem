import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import TimerIcon from "@mui/icons-material/Timer";
const AttendanceTracker = () => {
  const [time, setTime] = useState([]);
  useEffect(() => {
    axios({ url: "http://localhost:4000/api/userTime" }).then((res) => {
      setTime(res.data);
    });
  });
  return (
    <div className="mt-lg">
      <Container>
        <Box className="Attendece-Tracker">
          <Typography className="Heading">Attendence Tracker</Typography>
          <Grid container spacing={2}>
            {time?.data?.map((times) => (
              <Grid item xs={3}>
                <Box className="list">
                  {times?.duration?.hours < 4 ? (
                    <Box className="lable lable-absent">Absent</Box>
                  ) : times?.duration?.hours < 8 &&
                    times?.duration?.hours >= 4 ? (
                    <Box className="lable lable-half">Half Day</Box>
                  ) : (
                    <Box className="lable">Present</Box>
                  )}
                  {/* <Box className="lable">Present</Box> */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Box className="center ">
                      <CalendarMonthIcon className="icon-color-sm" />
                      {times?.date?.day}-{times?.date?.month}-
                      {times?.date?.year}
                    </Box>
                    <Box className="center">
                      <LocationOnIcon className="icon-color-sm" />
                      <Typography className="Location">
                        {times?.location}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={8}
                    sx={{ width: "100%" }}
                    className="mt-sm"
                  >
                    <Box>
                      <Typography className="check-time">
                        {times?.time}
                      </Typography>
                      <Typography className="check-text-checkin">
                        Check In
                      </Typography>
                    </Box>
                    <Box>
                      <Typography className="check-time">
                        {times?.endtime}
                      </Typography>
                      <Typography className="check-text-checkout">
                        Check Out
                      </Typography>
                    </Box>
                  </Stack>
                  <Box className="center mt-sm">
                    <Box className="duration-container center">
                      <WatchLaterOutlinedIcon className="icon-color-white" />
                      <span>{times?.duration?.hours}:</span>
                      <span>{times?.duration?.minutes}:</span>
                      <span>{times?.duration?.seconds}</span>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default AttendanceTracker;
