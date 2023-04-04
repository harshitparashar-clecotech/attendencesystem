import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useState, useEffect } from "react";
import axios from "axios";

const pages = ["Products", "Pricing", "Blog"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [data, setData] = useState();

  useEffect(() => {
    axios({ url: "http://localhost:4000/api/userData" }).then((res) => {
      setData(res.data.data);
    });
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { LoginUser, setLogin } = useContext(UserContext);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authToken");

    navigate("/");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ED241B",
              textDecoration: "none",
            }}
          >
            ClecoTech
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ED241B",
              textDecoration: "none",
            }}
          >
            ClecoTech
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              paddingLeft: "2rem",
            }}
          >
            {localStorage.getItem("authToken") ? (
              <>
                <Box component={Link} to="/loginPage" className="nav-Links">
                  Home
                </Box>
                <Box
                  component={Link}
                  to="/attendenceTracker"
                  className="nav-Links"
                >
                  Attendence Tracker
                </Box>
                <Box component={Link} to="/orgination" className="nav-Links">
                Orgination
                </Box>
              </>
            ) : null}
          </Box>

          {localStorage.getItem("authToken") ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={data?.name} src="/static/images/avatar/2.jpg" />
              </IconButton>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Box>
                    <Typography className="emp_data">
                      Emp. No. : <span>{data?.emp}</span>
                    </Typography>
                    <Typography className="emp_data">
                      Emp. Name : <span>{data?.name}</span>
                    </Typography>
                    <Button
                      onClick={logout}
                      variant="outlined"
                      className="checkIn-btn mt-sm"
                    >
                      Logout
                    </Button>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
