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
} from "@mui/icons-material";
import "./styles.css";
import fetchDeleteCookies from "../api/fetchDeleteCookies";

const NavBar = ({ isAdmin }) => {
  const location = useLocation();

  const cookieExists = () => {
    const hasCookie = document.cookie.includes("userToken");
    return hasCookie;
  };

  const handleLogInOrOut = () => {
    if (cookieExists) {
      fetchDeleteCookies();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Vikan Demo</Typography>

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

        {cookieExists && (
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
          {cookieExists ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
