import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  Paper,
  Tab,
  Tabs
} from "@mui/material";
import Create from "./AdminPanel/Create";
import Update from "./AdminPanel/Update";
import Delete from "./AdminPanel/Delete";
import FileUploader from "./AdminPanel/FileUploader";
import MessageBanner from "./MessageBanner";
import fetchNames from "../api/fetchNames";
// icons
import CreateIcon from '@mui/icons-material/Create';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Admin = () => {
  const [value, setValue] = useState(0); // To control the selected tab
  const [names, setNames] = useState([]);

  // message banner state
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // 'success' or 'error'

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseBanner = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    // Make a GET request to your server's /api/names route
    const getNames = async () => {
      let dataNames = await fetchNames();
      setNames(dataNames);
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
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleTabChange} centered>
          <Tab label="Create" icon={<CreateIcon />} />
          <Tab label="Update" icon={<UpdateIcon />} />
          <Tab label="Delete" icon={<DeleteIcon />} />
          <Tab label="File Upload" icon={<CloudUploadIcon />} />
        </Tabs>
        </AppBar>
        <Box p={3}>
          {value === 0 && (
            <Create
              setOpen={setOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
              setNames={setNames}
            />
          )}{" "}
          {/* Render the Create component when the "Create" tab is selected */}
          {value === 1 && (
            <Update
              setOpen={setOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
              names={names}
            />
          )}{" "}
          {/* Render the Update component when the "Update" tab is selected */}
          {value === 2 && (
            <Delete
              setOpen={setOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
              setNames={setNames}
              names={names}
            />
          )}{" "}
          {/* Render the Delete component when the "Delete" tab is selected */}
          {value === 3 && (
            <FileUploader
              setOpen={setOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
              names={names}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Admin;
