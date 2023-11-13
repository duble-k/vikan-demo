import React from 'react';
import { Typography, Container, Divider, Link, Box } from '@mui/material';
import './styles.css'; // Import your custom CSS styles

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={5}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Lab Database Demo
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Welcome to the Future of Lab Management
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Explore the capabilities of our cutting-edge software designed for efficient lab management.
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Connect with us:
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Link
            href={"https://www.linkedin.com/in/kian-karbasy-95173820a/"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'none' }}
          >
            LinkedIn
          </Link>
          <Link
            href={"https://github.com/duble-k"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'none' }}
          >
            Github
          </Link>
          <Typography variant="body1" style={{ color: 'black' }}>
            If you came here using the vikan-demo URL, try our custom domain:&nbsp;
            <Link
              href={"https://www.weeelab.com"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', cursor: 'pointer', textDecoration: 'none' }}
            >
              weeelab.com
            </Link>
          </Typography>
        </div>
      </Box>
    </Container>
  );
};

export default HomePage;

