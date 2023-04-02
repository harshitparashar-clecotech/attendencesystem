import React, { useEffect, useState } from "react";
import axios from "axios";
import ControlButtons from "./ControlButtons";

function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
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
  React.useEffect(() => {
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

  React.useEffect(() => {
    handleTime();
    // getUserGeolocationDetails();
  });
  React.useEffect(() => {
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
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleEnd = async (e) => {
    setIsActive(false);
    setIsPaused(false);
    const currentend = new Date();
    const endtime = currentend.toLocaleTimeString("en-US");

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
  };

  return (
    <div className="stop-watch">
      <div className="timer">
        <span className="digits">{Math.floor(time / 360000)}:</span>
        <span className="digits">
          {"0" + Math.floor((time % 360000) / 6000)}:
        </span>
        <span className="digits mili-sec">
          {"0" + Math.floor((time % 6000) / 100)}
        </span>
      </div>

      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleEnd={handleEnd}
      />

      {location?.name}
    </div>
  );
}

export default StopWatch;
