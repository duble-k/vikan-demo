import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Create from "./AdminPanel/Create";
import Update from "./AdminPanel/Update";
import Delete from "./AdminPanel/Delete";
import FileUploader from "./AdminPanel/FileUploader";
import MessageBanner from "./MessageBanner";
import fetchCountryNames from "../api/fetchCountryNames";

const Admin = () => {
  const [value, setValue] = useState(0); // To control the selected tab
  const [countries, setCountries] = useState([]);

  // message banner state
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // 'success' or 'error'

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseBanner = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    // Make a GET request to your server's /api/countries route
    const getNames = async () => {
      let countryNames = await fetchCountryNames();
      setCountries(countryNames);
    };
    getNames();
  }, []); // The empty dependency array ensures this runs only once on component mount

  return (
    <Container maxWidth="md">
      <MessageBanner
        open={open}
        message={message}
        severity={severity}
        onClose={handleCloseBanner}
      />
      <Typography
        style={{ paddingTop: "20px" }}
        variant="h5"
        align="center"
        gutterBottom
      >
        Admin Operations
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Create" />
            <Tab label="Update" />
            <Tab label="Delete" />
            <Tab label="File Upload" />
          </Tabs>
        </AppBar>
        <Box p={3}>
          {value === 0 && (
            <Create
              setOpen={setOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
              setCountries={setCountries}
            />
          )}{" "}
          {/* Render the Create component when the "Create" tab is selected */}
          {value === 1 && (
            <Update
              setOpen={setOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
              countries={countries}
            />
          )}{" "}
          {/* Render the Update component when the "Update" tab is selected */}
          {value === 2 && (
            <Delete
              setOpen={setOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
              setCountries={setCountries}
              countries={countries}
            />
          )}{" "}
          {/* Render the Delete component when the "Delete" tab is selected */}
          {value === 3 && (
            <FileUploader
              setOpen={setOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
              countries={countries}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Admin;
