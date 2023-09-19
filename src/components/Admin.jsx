import React, { useState, useEffect } from 'react';
import { AppBar, Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import Upload from './AdminPanel/Upload';
import Update from './AdminPanel/Update';
import Delete from './AdminPanel/Delete'

const Admin = ({ token }) => {
  const [value, setValue] = useState(0); // To control the selected tab
  const [countries, setCountries] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Make a GET request to your server's /api/countries route
    fetch('http://localhost:8080/api/names', {
      headers: {
        Authorization: `Bearer ${token}`,
       'Content-Type': 'application/json',
     }
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the list of countries
        setCountries(data.countries);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching country names:', error);
      });
  }, [token]); // The empty dependency array ensures this runs only once on component mount

  return (
    <Container maxWidth="md">
      <Typography style={{paddingTop: "20px"}} variant="h5" align="center" gutterBottom>
        Admin Operations
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Upload" />
            <Tab label="Update" />
            <Tab label="Delete" />
          </Tabs>
        </AppBar>
        <Box p={3}>
          {value === 0 && <Upload setCountries={setCountries} token={token} />} {/* Render the Create component when the "Create" tab is selected */}
          {value === 1 && <Update countries={countries} token={token} />} {/* Render the Update component when the "Update" tab is selected */}
          {value === 2 && <Delete setCountries={setCountries} countries={countries} token={token} />} {/* Render the Delete component when the "Delete" tab is selected */}
        </Box>
      </Paper>
    </Container>
  );
};

export default Admin;
