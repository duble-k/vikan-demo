import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider,
  Autocomplete,
  Grid,
} from "@mui/material";
import uploadPdf from "../../api/uploadPdf";

const FileUploader = ({ setOpen, setSeverity, setMessage, names }) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [label, setLabel] = useState(''); // Added label state

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleUpload = async () => {
    setIsLoading(true);

    if (!selectedFile || !label) {
      setSeverity('error');
      setMessage('Please select a file and provide a label to upload');
      setOpen(true);
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('associatedFieldName', searchInput);
      formData.append('label', label); // Added label to form data
      formData.append('pdf', selectedFile);

      const response = await uploadPdf(formData);
      const data = await response.json();

      if (response.status === 200) {
        setSeverity('success');
        setMessage(`File: ${selectedFile?.name} successfully uploaded with label: ${label}`);
        setOpen(true);
        setSelectedFile(null);
        setLabel(''); // Clear label after successful upload
      } else {
        setSeverity('error');
        setMessage(data.message);
        setOpen(true);
      }
    } catch (error) {
      console.error('Error uploading PDF file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Select Lab Item To Upload File To
      </Typography>
      <Divider />
      <Grid
        style={{ paddingTop: '10px' }}
        container
        spacing={2}
        alignItems="center"
      >
        <Grid item xs={12}>
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
        <Grid item xs={12} style={{ paddingBottom: '20px' }}>
          <TextField
            label="Label"
            variant="outlined"
            fullWidth
            margin="normal"
            value={label}
            onChange={handleLabelChange}
          />
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: '20px' }}>
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </Grid>
      </Grid>
      <Button
        disabled={!searchInput || !selectedFile || !label || isLoading}
        variant="contained"
        color="primary"
        onClick={handleUpload}
      >
        Upload
      </Button>
      {isLoading && (
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <span>Uploading...</span>
          <CircularProgress size={20} style={{ marginLeft: 10 }} />
        </div>
      )}
    </>
  );
};

export default FileUploader;
