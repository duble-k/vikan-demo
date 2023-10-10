import React, { useState } from 'react';
import {
  Container,
  TextField,
  Autocomplete,
  Grid,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  CircularProgress
} from '@mui/material';
import DeleteConfirmationDialog from './DeletionConfirmationDialog';
import noImage from '../../images/default.jpg';
import fetchCountryInfo from '../../api/fetchCountryInfo';
import deleteCountryInfo from '../../api/deleteCountryInfo';
import fetchCountryNames from '../../api/fetchCountryNames';

const Delete = ({ setOpen, setSeverity, setMessage, setCountries, countries}) => {
  const [searchInput, setSearchInput] = useState('');
  const [countryInfo, setCountryInfo] = useState(null); // Store country data

  // delete pop-up stuff
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await deleteCountryInfo(searchInput);
    let data = await response.json();
    setIsLoading(false);
    console.log(response)
    if (response.status !== 200) 
    {
        setSeverity("error");
    }
    else 
    {
        setSeverity("success");
        setSearchInput(null);
        setCountryInfo(null);
    }
    try
    {
        let updatedCountriesNames = await fetchCountryNames();
        console.log(updatedCountriesNames);
        setCountries(updatedCountriesNames);
    }
    catch(error)
    {
        console.log("Error fetching new country names after delete, error: ", error);
    }
    setMessage(data.message);
    setOpen(true);
    handleCloseDeleteDialog();
  };

  // other
  const handleSearch = async () => {
    //TODO: add error handling
    const result = await fetchCountryInfo({countryName: searchInput})
    setCountryInfo(result);
  };

    // how to indicate loading
    const [isLoading, setIsLoading] = useState(false);

  return (
    <>
        <Typography variant="h6" gutterBottom>
            Delete Preview
        </Typography>
        <Divider />
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
            <Button disabled={!searchInput} variant="outlined" onClick={handleSearch}>
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
                    <Grid style={{paddingLeft: "10px"}} item xs={12} sm={6}>
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
                    </Grid>
                </Grid>
                <Button style={{marginTop: "10px"}} disabled={!searchInput} variant="contained" color="error" type="submit" onClick={handleOpenDeleteDialog}>
                    Delete
                </Button>
                {isLoading && (
                    <div style={{ display: 'flex' }}>
                        <span>Deleting...</span>
                        <CircularProgress size={20} style={{ marginLeft: 10 }} />
                    </div>
                )}
            </>
        )}
        </Container>
        <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            onConfirm={handleDelete}
            message={`Are you sure you want to delete ${searchInput}?`}
        />
    </>
  );
};

export default Delete;