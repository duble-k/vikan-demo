import React, { useState } from 'react';
import { Typography, TextField, Button, CircularProgress, Divider, Autocomplete, Grid } from '@mui/material';
import uploadPdf from '../../api/uploadPdf';

const FileUploader = ({ setOpen, setSeverity, setMessage, countries, token }) => {
    const [searchInput, setSearchInput] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleUpload = async () => {
        setIsLoading(true);

        if (selectedFiles.length === 0) {
            setSeverity("error");
            setMessage("Please select at least one file to upload")
            setOpen(true);
          return;
        }
      
        try {
          for (const file of selectedFiles) {
            const formData = new FormData();
            formData.append('associatedFieldName', searchInput);
            formData.append('pdf', file);
            console.log(file);
            
            const response = await uploadPdf(formData, token);
            const data = await response.json();
      
            if (response.status === 200) {
                setSeverity("success");
                setMessage(`File: ${file?.name} successfully uploaded!`);
                setOpen(true);
            } else {
                setSeverity("error");
                setMessage(data.message)
                setOpen(true);
                setIsLoading(false);
                setSelectedFiles([]);
              return; // Stop further uploads on failure
            }
          }
      
          // All uploads completed successfully
          setSeverity("success");
          setMessage(`All File(s) successfully uploaded!`);
          setOpen(true);
          // reset fields
          setSearchInput('');
          setSelectedFiles([]);
          // Clear the input file element
          const inputFile = document.getElementById('file-input');
          if (inputFile) {
            inputFile.value = 'No file chosen';
          }
        } catch (error) {
          console.error('Error uploading PDF files:', error);
        }
        setIsLoading(false);
      };
      

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Select Country To Upload Files To
            </Typography>
            <Divider />
            <Grid style={{ paddingTop: "10px" }} container spacing={2} alignItems="center">
                <Grid item xs={12}>
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
                <Grid item xs={12} style={{paddingBottom: "20px"}}>
                    <input id="file-input" type="file" accept=".pdf" multiple onChange={handleFileChange} />
                </Grid>
            </Grid>
            {/* Where multi file selector will go */}
            <Button disabled={searchInput === ''} variant="contained" color="primary" type="submit" onClick={handleUpload}>
                Upload
            </Button>
            {isLoading && (
                <div style={{ marginTop: "10px", display: 'flex' }}>
                    <span>Uploading...</span>
                    <CircularProgress size={20} style={{ marginLeft: 10 }} />
                </div>
            )}
        </>
    );
};

export default FileUploader;
