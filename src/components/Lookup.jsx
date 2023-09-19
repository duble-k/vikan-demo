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
  Button
} from '@mui/material';
import noImage from '../images/default.jpg';
import fetchCountryInfo from '../api/fetchCountryInfo'
import fetchCountryNames from '../api/fetchCountryNames';

const Lookup = ({ token }) => {
  const [searchInput, setSearchInput] = useState('');
  const [countryInfo, setCountryInfo] = useState(null); // Store country data
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Make a GET request to your server's /api/countries route
    const getNames = async () => {
      let countryNames = await fetchCountryNames(token);
      setCountries(countryNames);
    };
    getNames();
  }, [token]); // The empty dependency array ensures this runs only once on component mount


  const handleSearch = async () => {
    //TODO: add error handling
    const result = await fetchCountryInfo({countryName: searchInput}, token)
    setCountryInfo(result);
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: '20px'}}>
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
      )}
    </Container>
  );
};

export default Lookup;
