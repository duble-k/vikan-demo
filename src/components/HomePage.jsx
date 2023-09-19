import React from 'react';
import { Container, Typography, Divider } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Vikan Demo
      </Typography>
      <Divider />
      <Typography variant="body1">
        This Web App displays a simple solution to lookup, upload, update, and delete data using various countries' data as a simple example.
      </Typography>
      <Divider />
      <Typography variant="body1">
        When exploring and playing around with the applicaitons features, try to envision what your use case would be, and we can bring that to life!
      </Typography>
      <Divider />
      <Typography variant="body1">
        At Vikan, we are dedicated to providing a simple, yet elegant software solution for your day-to-day problems.
      </Typography>
      <Divider />
    </Container>
  );
};

export default HomePage;
