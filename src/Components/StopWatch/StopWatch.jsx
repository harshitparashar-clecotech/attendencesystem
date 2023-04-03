import React, { useEffect, useState } from "react";
import axios from "axios";
import ControlButtons from "./ControlButtons";
import { Box, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import Clock from "./Clock";

function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const [endtimeforme, setendTime] = useState();

  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //   const [details, setDetails] = useState(null);

  //   const getUserGeolocationDetails = async () => {
  //     await fetch(
  //       "https://geolocation-db.com/json/67273a00-5c4b-11ed-9204-d161c2da74ce"
  //     )
  //       .then((res) => res.json())
  //       .then((data) => setDetails(data))
  //       .catch((err) => console.log(err));
  //   };

  const [longi, setLongi] = useState("");
  const [lati, setLati] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLati(position.coords.latitude);
      setLongi(position.coords.longitude);
    });

    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=1fa60f05a70941ae95a100008230204&q=${lati},${longi}`
      )
      .then((res) => setLocation(res.data.location));
  }, [longi, lati]);

  const handleTime = () => {
    // setHours(("0" + Math.floor((time / 60000) % 60)).slice(-2));
    setHours(Math.floor(time / 360000));

    // setMinutes(("0" + Math.floor((time / 1000) % 60)).slice(-2));
    setMinutes(Math.floor((time % 360000) / 6000));

    // setSeconds(("0" + ((time / 10) % 100)).slice(-2));
    setSeconds(Math.floor((time % 6000) / 100));
  };

  useEffect(() => {
    handleTime();
    // getUserGeolocationDetails();
  });
  useEffect(() => {
    let interval = null;
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const [timecurrent, setTimecurrent] = useState();
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    const current = new Date();
    setTimecurrent(current.toLocaleTimeString("en-US"));
  };

  let newDate = new Date();
  // let currentTime = newDate.toLocaleTimeString("en-US");
  let day = newDate.getDate();
  let month = monthList[newDate.getMonth()];
  let year = newDate.getFullYear();

  const handleEnd = async (e) => {
    setIsActive(false);
    setIsPaused(false);
    const currentend = new Date();
    const endtime = currentend.toLocaleTimeString("en-US");
    setendTime(currentend.toLocaleTimeString("en-US"));

    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: timecurrent.toString(),
        endtime: endtime.toString(),
        duration: { hours: hours, minutes: minutes, seconds: seconds },
        location: location.name,
        emp: localStorage.getItem("UserValue"),
        date: { day: day, month: month, year: year },
      }),
    });
    setTime(0);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  return (
    <Box className="stopWatch">
      <Typography className="attendenceHeading">Attendence</Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
        className="dateContainer"
      >
        <Box className="date center">
          <CalendarMonthIcon className="icon-color" />
          <span>{day}</span>
          <span>{month}</span>
          <span>{year}</span>
        </Box>
        <Box className="center">
          <WatchLaterOutlinedIcon className="icon-color" />
          {/* <Box>{currentTime}</Box> */}
          <Clock/>
        </Box>
      </Stack>

      <Box className="timer center mt-sm">
        <span className="digits">{Math.floor(time / 360000)}:</span>
        <span className="digits">
          {"0" + Math.floor((time % 360000) / 6000)}:
        </span>
        <span className="digits">{Math.floor((time % 6000) / 100)}</span>
        <span className="hrs">Hrs</span>
      </Box>

      <Box className="center">
        <LocationOnIcon className="icon-color" />
        {location.name}
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        {!timecurrent == "" ? (
          <>
            <Box className="checkIn-Container">
              <Box className="center mt-sm">{timecurrent}</Box>
              <Box className="checkIn">Check In</Box>
            </Box>
          </>
        ) : null}
        {!endtimeforme == "" ? (
          <Box className="checkIn-Container">
            <Box className="center mt-sm">{endtimeforme}</Box>
            <Box className="checkOut">Check Out</Box>
          </Box>
        ) : null}
      </Stack>
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handleEnd={handleEnd}
        handlePauseResume={handlePauseResume}
      />
    </Box>
  );
}

export default StopWatch;
