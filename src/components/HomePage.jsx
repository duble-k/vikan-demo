import React from 'react';
import { Typography, Container, Paper, Divider } from '@mui/material';
import './styles.css'; // Import your custom CSS styles

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" className="title-home" gutterBottom>
          Welcome to Vikan Demo
        </Typography>
        <Divider className="divider-home" />
        <Typography variant="body1">
          This Web App displays a simple solution to lookup, upload, update, and delete data using various countries' data as a simple example.
        </Typography>
        <Typography variant="body1">
          When exploring and playing around with the application's features, try to envision what your use case would be, and we can bring that to life!
        </Typography>
        <Typography variant="body1">
          At Vikan, we are dedicated to providing a simple, yet elegant software solution for your day-to-day problems.
        </Typography>
        <Divider className="divider-home" />
      </Paper>
    </Container>
  );
};

export default HomePage;

