import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const NavBar = ({isAdmin}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/lookup">
          Lookup
        </Button>
        {isAdmin && (
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
