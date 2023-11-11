import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Biotech as BiotechIcon
} from "@mui/icons-material";
import "./styles.css";
import fetchDeleteCookie from "../api/fetchDeleteCookie";
import { useSessionStorageContext } from "../SessionStorageContext";

const NavBar = () => {

  const {isAdmin, hasCookie, updateSessionData} = useSessionStorageContext();

  const location = useLocation();

  const handleLogInOrOut = async () => {
    if (hasCookie) {
      await fetchDeleteCookie();
      updateSessionData({ isAdmin: false, hasCookie: false });
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <BiotechIcon sx={{ fontSize: 30, marginRight: 1 }} />
        <Typography variant="h6">Lab Demo</Typography>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, backgroundColor: "white" }}
        />

        <IconButton
          className={location.pathname === "/" ? "active-button" : ""}
          edge="start"
          component={Link}
          to="/"
          color="inherit"
          aria-label="home"
        >
          <HomeIcon />
        </IconButton>

        {hasCookie && (
          <>
            <Button
              className={location.pathname === "/lookup" ? "active-button" : ""}
              color="inherit"
              component={Link}
              to="/lookup"
            >
              <SearchIcon />
              Lookup
            </Button>
            {isAdmin && (
              <Button
                className={
                  location.pathname === "/admin" ? "active-button" : ""
                }
                color="inherit"
                component={Link}
                to="/admin"
              >
                <DashboardIcon />
                Admin
              </Button>
            )}
          </>
        )}

        <div style={{ flexGrow: 1 }}></div>
        <Button
          className={location.pathname === "/login" ? "active-button" : ""}
          color="inherit"
          component={Link}
          to="/login"
          onClick={handleLogInOrOut}
        >
          <PersonIcon />
          {hasCookie ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
