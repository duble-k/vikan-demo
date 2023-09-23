import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Autocomplete,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Pagination
} from '@mui/material';
import MessageBanner from './MessageBanner';
import noImage from '../images/default.jpg';
import fetchCountryInfo from '../api/fetchCountryInfo'
import fetchCountryNames from '../api/fetchCountryNames';
import fetchPdf from '../api/fetchPdf';

const Lookup = ({ token }) => {
  const [searchInput, setSearchInput] = useState('');
  const [countryInfo, setCountryInfo] = useState(null); // Store country data
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); // 'success' or 'error'
  const [page, setPage] = useState(1); // Current page
  const itemsPerPage = 3; // Number of items per page

  const handleCloseBanner = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
  };

  useEffect(() => {
    // Make a GET request to your server's /api/countries route
    const getNames = async () => {
      let countryNames = await fetchCountryNames(token);
      setCountries(countryNames);
    };
    getNames();
  }, [token]); // The empty dependency array ensures this runs only once on component mount

  // Calculate the start and end index for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSearch = async () => {
    //TODO: add error handling
    const result = await fetchCountryInfo({countryName: searchInput}, token)
    setCountryInfo(result);
    setPage(1); // Reset page to 1 when performing a new search
  };

  const handlePdfClick = async (pdfName) => {
    // Make a POST request to your server's /api/get-pdf endpoint with the PDF name
    try {
      const response = await fetchPdf(pdfName, token);
      if (response.ok) {
        // Open the PDF in a new tab or window
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      } else {
        setSeverity("error");
        setMessage(`Error fetching File: ${pdfName}`);
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: '20px'}}>
      <MessageBanner
          open={open}
          message={message}
          severity={severity}
          onClose={handleCloseBanner}
      />
      <Grid style={{paddingBottom: "20px"}} container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <Autocomplete
            ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
            id="country-search"
            options={countries}
            value={searchInput}
            onChange={(event, newValue) => {
              setSearchInput(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for a Country"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
      {countryInfo && (
        <>
          <Grid container>
            <Grid style={{border: "2px solid"}} item xs={12} sm={6}>
              <CardMedia
                component="img"
                height="377"
                alt="Country Flag"
                src={countryInfo.image ? countryInfo.image : noImage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card raised>
                <CardContent>
                  <Typography variant="h5">{countryInfo?.country}</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Founded" secondary={countryInfo?.founded}/>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Population" secondary={countryInfo?.population}/>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Political" secondary={countryInfo?.political}/>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Currency" secondary={countryInfo?.currency}/>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {countryInfo.associatedPdfs.length > 0 &&
            <Card raised>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                  Available PDFs
                </Typography>
                <List>
                  {countryInfo?.associatedPdfs
                  .slice(startIndex, endIndex)
                  .map((pdfName, index) => (
                    <div key={index}>
                      <ListItem onClick={() => handlePdfClick(pdfName)}>
                        <ListItemText primary={pdfName} />
                      </ListItem>
                      {index < countryInfo.associatedPdfs.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
                <Pagination
                  count={Math.ceil(countryInfo.associatedPdfs.length / itemsPerPage)}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                />
              </CardContent>
            </Card>
          }
          </>
        )}
      </Container>
  );
};

export default Lookup;
