import React from 'react';
import { Typography, Container, Divider, Link, Grid } from '@mui/material';
import './styles.css'; // Import your custom CSS styles

const HomePage = () => {
  return (
    <Container maxWidth="md">
        <Typography align='center' variant="h2" gutterBottom>
          Lab Database Demo
        </Typography>
        <Divider />
        <Typography variant="h4" align='center' gutterBottom>
          We hope you enjoy exploring the capabilities of this software.
        </Typography>
        <Typography variant="h5" align='center' gutterBottom>
          Check our links out:
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <Link
                href={"https://www.linkedin.com/in/kian-karbasy-95173820a/"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue', cursor: 'pointer' }}
                >
                LinkedIn
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link
                href={"https://github.com/duble-k"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue', cursor: 'pointer' }}
                >
                Github
            </Link>
          </Grid>
        </Grid>
    </Container>
  );
};

export default HomePage;

