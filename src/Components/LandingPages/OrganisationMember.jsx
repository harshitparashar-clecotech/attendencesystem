import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const OrganisationMember = () => {
  const [userdata, setUserdata] = useState();
  useEffect(() => {
    axios({ url: "http://localhost:4000/api/orgination" }).then((res) => {
      setUserdata(res.data.data);
    });
  });

  console.log(userdata);
  return (
    <Box className="mt-lg organisation">
      <Container>
        <Typography className="Heading">Orgination Member</Typography>
        <Grid container spacing={2}>
          {userdata?.map((value) => (
            <Grid item xs={12} sm={3}>
              <Box className="member-list">
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <Avatar
                    alt={value.name}
                    src="/static/images/avatar/2.jpg"
                    className="Avatar-bg"
                  />
                  <Box className="center">
                    <LocationOnIcon className="icon-color" />
                    <Typography className="Location">
                      {value.location}
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  className="mt-sm"
                >
                  <Typography className="emp_id_heading">
                    Employee ID:{" "}
                  </Typography>
                  <Typography className="emp_id">{value.emp}</Typography>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                >
                  <Typography className="emp_id_heading">Emp Name:</Typography>
                  <Typography className="emp_id">{value.name}</Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OrganisationMember;
