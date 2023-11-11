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
import updateInfo from "../../api/updateInfo";
import fetchInfo from "../../api/fetchInfo";

const Update = ({ setOpen, setSeverity, setMessage, names }) => {
  const [searchInput, setSearchInput] = useState("");
  const [formData, setFormData] = useState({
    name: "", 
    testingSite: "", 
    orderingInstructions: "",
    container: "",
    collectionInstructions: "",
    frequency: "",
    TAT: "",
    stabilityForAddOn: "",
    externalLink: "",
    image: "" 
  });

  const [imageData, setImageData] = useState(""); // Store the base64 encoded image data
  // how to indicate loading
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const result = await fetchInfo({ name: searchInput });
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
    const response = await updateInfo({
      ...formData,
      image: imageData ? imageData : formData.image,
    });
    let data = await response.json();
    setIsLoading(false);
    console.log(response);
    if (response.status !== 200) {
      setSeverity("error");
    } else {
      setSeverity("success");
      setFormData({
        name: "", 
        testingSite: "", 
        orderingInstructions: "",
        container: "",
        collectionInstructions: "",
        frequency: "",
        TAT: "",
        stabilityForAddOn: "",
        externalLink: "",
        image: "" 
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
      <Grid
        style={{ paddingTop: "10px" }}
        container
        spacing={2}
        alignItems="center"
      >
        <Grid item xs={10}>
          <Autocomplete
            ListboxProps={{ style: { maxHeight: 200, overflow: "auto" } }}
            id="data-search"
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
          <Button
            disabled={searchInput === "" || !searchInput}
            variant="outlined"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
          <div
            style={{
              paddingTop: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="imagePicker" style={{ marginBottom: "8px" }}>
              Image (PNG or JPG)
            </label>
            <input
              type="file"
              id="imagePicker"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </div>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <TextField
            label="Testing Site"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.testingSite}
            onChange={(e) =>
              setFormData({ ...formData, testingSite: e.target.value })
            }
          />
          <TextField
            label="Ordering Instructions"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.orderingInstructions}
            onChange={(e) =>
              setFormData({ ...formData, orderingInstructions: e.target.value })
            }
          />
          <TextField
            label="Container"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.container}
            onChange={(e) =>
              setFormData({ ...formData, container: e.target.value })
            }
          />
          <TextField
            label="Collection Instructions"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.collectionInstructions}
            onChange={(e) =>
              setFormData({ ...formData, collectionInstructions: e.target.value })
            }
          />
          <TextField
            label="Frequency"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.frequency}
            onChange={(e) =>
              setFormData({ ...formData, frequency: e.target.value })
            }
          />
          <TextField
            label="TAT"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.TAT}
            onChange={(e) =>
              setFormData({ ...formData, TAT: e.target.value })
            }
          />
          <TextField
            label="Stability for Add on Test"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.stabilityForAddOn}
            onChange={(e) =>
              setFormData({ ...formData, stabilityForAddOn: e.target.value })
            }
          />
          <TextField
            label="External Reference Link"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.externalLink}
            onChange={(e) =>
              setFormData({ ...formData, externalLink: e.target.value })
            }
          />
        </div>
        <Button
          disabled={
            formData.name === "" || searchInput === "" || !searchInput
          }
          variant="contained"
          color="primary"
          type="submit"
          style={{marginTop: "10px"}}
        >
          Update
        </Button>
        {isLoading && (
          <div style={{ display: "flex" }}>
            <span>Updating...</span>
            <CircularProgress size={20} style={{ marginLeft: 10 }} />
          </div>
        )}
      </form>
    </>
  );
};

export default Update;
