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
  Tabs,
  CircularProgress
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
  // loading pop-up state
  const [isLoading, setIsLoading] = useState(false);

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
    // TODO: can move this to server side if information set becomes too large
    // Check if the current search input value is in the list of names
    if (!names.includes(searchInput)) {
      // Display an error message (you can customize this message)
      setOpen(true);
      setMessage("Invalid search input. Please select a valid option from the list.");
      setSeverity("warning");
      return;
    }
    //TODO: add error handling
    setIsLoading(true);
    const result = await fetchInfo({ name: searchInput });
    setIsLoading(false);
    setResult(result);
  };

  const handleAutocompleteKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Prevent the default behavior of the Enter key (form submission)
      event.preventDefault();
      // Trigger the search action
      handleSearch();
    }
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
        <Grid item xs={9}>
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
                onKeyDown={handleAutocompleteKeyDown}
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
        <Grid item xs={1}>
          {/* Added if server takes too long to respond */}
          {isLoading && (
              <div style={{ display: "flex" }}>
                <CircularProgress size={20} style={{ marginLeft: 10 }} />
              </div>
          )}
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
            {tabValue === 1 && (
              <FormsList
                name={ result.name }
                associatedPdfs={ result.associatedPdfs }
                setOpen={setOpen}
                setMessage={setMessage}
                setSeverity={setSeverity}
              />
            )}{" "}
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default Lookup;
