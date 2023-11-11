import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Autocomplete,
  Grid,
  Button,
  AppBar,
  Box,
  Paper,
  Tab,
  Tabs
} from "@mui/material";
// child components
import LabInformation from "./Lookup/LabInformation";
import FormsList from "./Lookup/FormList";
import MessageBanner from "./MessageBanner";
// endpoint calls
import fetchInfo from "../api/fetchInfo";
import fetchNames from "../api/fetchNames";
// icons
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article"

const Lookup = () => {
  const [searchInput, setSearchInput] = useState(null);
  const [names, setNames] = useState([]);
  const [result, setResult] = useState(null);
  const [tabValue, setTabValue] = useState(0); // To control the selected tab
  // success or error message stuff
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // 'success' or 'error'

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
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

  const handleSearch = async () => {
    //TODO: add error handling
    const result = await fetchInfo({ name: searchInput });
    setResult(result);
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: "20px" }}>
      <MessageBanner
        open={open}
        message={message}
        severity={severity}
        onClose={handleCloseBanner}
      />
      <Grid
        style={{ paddingBottom: "20px" }}
        container
        spacing={2}
        alignItems="center"
        justifyContent="center" // Center the content vertically
      >
        <Grid item xs={10}>
          {/* Autocomplete search input */}
          <Autocomplete
            ListboxProps={{ style: { maxHeight: 200, overflow: "auto" } }}
            id="country-search"
            options={names}
            value={searchInput}
            onChange={(event, newValue) => {
              setSearchInput(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Lab Item"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          {/* Search button */}
          <Button variant="outlined" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
      {result && (
        <Paper elevation={3} style={{ padding: "10px", marginTop: "10px" }}>
          <AppBar position="static" color="default">
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Information" icon={<InfoIcon />} />
            <Tab label="Forms" icon={<ArticleIcon />} />
          </Tabs>
          </AppBar>
          <Box p={3}>
            {tabValue === 0 && (
              <LabInformation
                result={ result }
              />
            )}{" "}
            {/* Render the Create component when the "Create" tab is selected */}
            {tabValue === 1 && (
              <FormsList
                name={ result.name }
                associatedPdfs={ result.associatedPdfs }
              />
            )}{" "}
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default Lookup;
