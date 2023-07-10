import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

function NavigationBar({ handleLogout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Hospital Management System
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/" color="inherit" startIcon={<HomeIcon />}>
          Home
        </Button>
        <Button component={Link} to="/login" color="inherit" startIcon={<LoginIcon />}>
          Login
        </Button>
        <Button component={Link} to="/" color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
