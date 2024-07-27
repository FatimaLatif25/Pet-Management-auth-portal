import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" 
    sx={{ 
      marginTop: 3,
      borderRadius: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      color:'#3f51b5'
     }}>
      <Toolbar sx>
        <Typography variant="h5" component="div" sx={{fontWeight: 300, fontSize: '1.5rem'}}>
          PET COMMUNITY
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 300, fontSize: '1rem' }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about" sx={{ fontWeight: 300, fontSize: '1rem' }}>
            About
          </Button>
          <Button color="inherit" component={Link} to="/service" sx={{ fontWeight: 300, fontSize: '1rem' }}>
            Services
          </Button>
          <Button color="inherit" component={Link} to="/contact" sx={{ fontWeight: 300, fontSize: '1rem' }}>
            Contact
          </Button>
          </Box> 
          <Box>
          {token ? (
            <Button color="inherit" onClick={handleLogout} startIcon={<Logout />} 
            sx={{ fontWeight: 300, fontSize: '1rem' }}>
            Logout
          </Button>
          ) : (
            <Button color="inherit" component={Link} to='/signup'>
            SignUp
          </Button>
          ) }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;