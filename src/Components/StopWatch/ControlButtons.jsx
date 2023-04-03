import { Box, Button, Grid, Stack } from "@mui/material";
import React from "react";

export default function ControlButtons(props) {
  return (
    <Box className="Control-Buttons mt-sm">
      <div>
        {props.active ? (
          <Box className="center">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={8}
              sx={{ width: "100%" }}
            >
              {props.isPaused ? (
                <Button
                  onClick={props.handlePauseResume}
                  variant="outlined"
                  className="break-btn"
                >
                  Break-Out
                </Button>
              ) : (
                <Button
                  onClick={props.handlePauseResume}
                  variant="outlined"
                  className="break-btn"
                >
                  Break-In
                </Button>
              )}
              <Button
                onClick={props.handleEnd}
                variant="contained"
                className="checkOut-btn"
              >
                Check Out
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box className="center">
            <Button
              className="checkIn-btn"
              variant="contained"
              onClick={props.handleStart}
            >
              Check In
            </Button>
          </Box>
        )}
      </div>
    </Box>
  );
}
