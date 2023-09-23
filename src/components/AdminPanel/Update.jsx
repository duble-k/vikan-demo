import React, { useState } from 'react';
import { Typography, TextField, Button, CircularProgress, Divider, Autocomplete, Grid } from '@mui/material';
import updateCountryInfo from '../../api/updateCountryInfo';
import fetchCountryInfo from '../../api/fetchCountryInfo';

const Update = ({ setOpen, setSeverity, setMessage, countries, token }) => {
    const [searchInput, setSearchInput] = useState('');
    const [formData, setFormData] = useState({
        country: '',
        founded: '',
        population: '',
        political: '',
        currency: '',
        image: '',
      });

    const [imageData, setImageData] = useState(''); // Store the base64 encoded image data
    // how to indicate loading
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {

        const result = await fetchCountryInfo({ countryName: searchInput }, token)
        setFormData(result);
    };

    // Your fetch function for uploading data will go here

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Convert the selected file to base64
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result); // Store the base64 encoded data
        };
        reader.readAsDataURL(selectedFile);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await updateCountryInfo(token, {...formData, image: imageData ? imageData : formData.image});
        let data = await response.json();
        setIsLoading(false);
        console.log(response)
        if (response.status !== 200) {
            setSeverity("error");
        }
        else {
            setSeverity("success");
            setFormData({
                country: '',
                founded: '',
                population: '',
                political: '',
                currency: '',
                image: '',
            });
            setImageData(null);
            setSearchInput(null);
        }
        setMessage(data.message);
        setOpen(true);
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Updating
            </Typography>
            <Divider />
            <Grid style={{ paddingTop: "10px" }} container spacing={2} alignItems="center">
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
                    <Button disabled={searchInput === '' || !searchInput} variant="outlined" onClick={handleSearch}>
                        Search
                    </Button>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <div style={{ paddingTop: "10px", display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="imagePicker" style={{ marginBottom: '8px' }}>
                        New Image (PNG or JPG)
                    </label>
                    <input
                        type="file"
                        id="imagePicker"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                    />
                </div>
                <TextField
                    label="Country"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
                <TextField
                    label="Population"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.population}
                    onChange={(e) => setFormData({ ...formData, population: e.target.value })}
                />
                <TextField
                    label="Currency"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                />
                <TextField
                    label="Founded"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.founded}
                    onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                />
                <TextField
                    label="Political"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.political}
                    onChange={(e) => setFormData({ ...formData, political: e.target.value })}
                />
                <Button disabled={formData.country === '' || (searchInput === '' || !searchInput)} variant="contained" color="primary" type="submit">
                    Update
                </Button>
                {isLoading && (
                    <div style={{ display: 'flex' }}>
                        <span>Updating...</span>
                        <CircularProgress size={20} style={{ marginLeft: 10 }} />
                    </div>
                )}
            </form>
        </>
    );
};

export default Update;