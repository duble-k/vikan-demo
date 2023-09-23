import React, { useState } from 'react';
import { Typography, TextField, Button, CircularProgress, Divider } from '@mui/material';
import sendCountryInfo from '../../api/sendCountryInfo';
import fetchCountryNames from '../../api/fetchCountryNames';

const Create = ({ setOpen, setSeverity, setMessage, setCountries, token}) => {
  // Define state variables for form inputs
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

  const handleImageFileChange = (e) => {
    const selectedImageFile = e.target.files[0];

    // Convert the selected file to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result); // Store the base64 encoded data
    };
    reader.readAsDataURL(selectedImageFile);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await sendCountryInfo({...formData, image: imageData}, token);
    let data = await response.json();
    setIsLoading(false);
    console.log(response)
    if (response.status !== 201)
    {
      setSeverity("error");
    }
    else
    {
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
    }
    const newCountyNames = await fetchCountryNames(token);
    setCountries(newCountyNames);
    setMessage(data.message);
    setOpen(true);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Create
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit}>
        <div style={{ paddingTop: "10px", display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="imagePicker" style={{ marginBottom: '8px' }}>
              Image (PNG or JPG)
          </label>
          <input
              type="file"
              id="imagePicker"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageFileChange}
          />
        </div>
        <TextField
          label="Country"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.country}
          onChange={(e) => setFormData({...formData, country: e.target.value})}
        />
        <TextField
          label="Population"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.population}
          onChange={(e) => setFormData({...formData, population: e.target.value})}
        />
        <TextField
          label="Currency"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.currency}
          onChange={(e) => setFormData({...formData, currency: e.target.value})}
        />
        <TextField
          label="Founded"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.founded}
          onChange={(e) => setFormData({...formData, founded: e.target.value})}
        />
        <TextField
          label="Political"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.political}
          onChange={(e) => setFormData({...formData, political: e.target.value})}
        />
        <Button disabled={formData.country} variant="contained" color="primary" type="submit">
          Submit
        </Button>
        {isLoading && (
          <div style={{ display: 'flex'}}>
            <span>Submitting...</span>
            <CircularProgress size={20} style={{ marginLeft: 10 }} />
          </div>
        )}
      </form>
    </>
  );
};

export default Create;