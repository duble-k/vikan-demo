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
import fetchInfo from '../../api/fetchInfo';
import deleteItem from '../../api/deleteItem';
import fetchNames from '../../api/fetchNames';

const Delete = ({ setOpen, setSeverity, setMessage, setNames, names}) => {
  const [searchInput, setSearchInput] = useState('');
  const [dataInfo, setDataInfo] = useState(null); // Store country data

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
    const response = await deleteItem(searchInput);
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
        setDataInfo(null);
    }
    try
    {
        let newNames = await fetchNames();
        console.log(newNames);
        setNames(newNames);
    }
    catch(error)
    {
        console.log("Error fetching new names after delete, error: ", error);
    }
    setMessage(data.message);
    setOpen(true);
    handleCloseDeleteDialog();
  };

  // other
  const handleSearch = async () => {
    //TODO: add error handling
    const result = await fetchInfo({name: searchInput})
    setDataInfo(result);
  };

  // for rendering items about to be deleted
  const listItems = [
    { key: 'testingSite', label: 'Testing Site' },
    { key: 'orderingInstructions', label: 'Ordering Instructions' },
    { key: 'container', label: 'Container' },
    { key: 'collectionInstructions', label: 'Collection Instructions' },
    { key: 'frequency', label: 'Frequency' },
    { key: 'TAT', label: 'TAT' },
    { key: 'stabilityForAddOn', label: 'Stability for Add on Test' },
    { key: 'externalLink', label: 'External Link' },
  ];

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
                id="data-search"
                options={names}
                value={searchInput}
                onChange={(event, newValue) => {
                setSearchInput(newValue);
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Item"
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
        {dataInfo && (
            <>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                            <img src={dataInfo.image ? dataInfo.image : noImage} alt="Lab Image" style={{ maxWidth: '100%' }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <List>
                            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                {listItems.map((item, index) => (
                                dataInfo?.[item.key] && (
                                    <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemText primary={item.label} secondary={dataInfo?.[item.key]} />
                                    </ListItem>
                                    {index !== listItems.length - 1 && <Divider />}
                                    </React.Fragment>
                                )
                                ))}
                            </div>
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