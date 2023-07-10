import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #f6f6f6, #eaeaea)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h1" style={{ fontSize: '48px', marginBottom: '32px', textAlign: 'center', color: '#333' }}>
         !!!! Emergency !!!!
        </Typography>
        <Typography variant="body1" style={{ fontSize: '18px', marginBottom: '32px', textAlign: 'center', color: '#666' }}>
          Let's Heal you for the New tomorrow !!!
        </Typography>

        <Typography variant="body1" style={{ fontSize: '18px', marginBottom: '32px', textAlign: 'center', color: '#666' }}>
          A Simple Registratrion Page for Doctors & Patients !!!!
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '200px' }}>
          <Link to="/register" style={{ textDecoration: 'none', flex: 1 }}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '100%', backgroundColor: '#FF4081', color: '#FFF', fontWeight: 'bold' }}
            >
              Register
            </Button>
          </Link>
          {/* <Link to="/login" style={{ textDecoration: 'none', flex: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: '100%', backgroundColor: '#2962FF', color: '#FFF', fontWeight: 'bold' }}
            >
              Login
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;