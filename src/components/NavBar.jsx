import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Search as SearchIcon, Person as PersonIcon, Dashboard as DashboardIcon } from '@mui/icons-material';


const NavBar = ({setToken, token, isAdmin}) => {

  const handleLogInOrOut = () => {
    if(token)
    {
      setToken(null);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6">
          Vikan Demo
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 2, backgroundColor: 'white' }} />
        <IconButton edge="start" component={Link} to="/" color="inherit" aria-label="home">
            <HomeIcon />
        </IconButton>
        <Button color="inherit" component={Link} to="/login" onClick={handleLogInOrOut}>
          <PersonIcon />
          {token ? "Logout" : "Login"}
        </Button>
        { token && (
          <>
            <Button color="inherit" component={Link} to="/lookup">
              <SearchIcon />
              Lookup
            </Button>
            { isAdmin && (
              <Button color="inherit" component={Link} to="/admin">
                <DashboardIcon />
                Admin
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
