import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import sendNewInfo from "../../api/sendNewInfo";
import fetchNames from "../../api/fetchNames";

const Create = ({ setOpen, setSeverity, setMessage, setNames }) => {
  // Define state variables for form inputs
  const [formData, setFormData] = useState({
    name: null, 
    testingSite: null, 
    orderingInstructions: null,
    container: null,
    collectionInstructions: null,
    frequency: null,
    TAT: null,
    stabilityForAddOn: null,
    externalLink: null,
    image: null
  });

  const [imageData, setImageData] = useState(""); // Store the base64 encoded image data
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
    const response = await sendNewInfo({ ...formData, image: imageData });
    let data = await response.json();
    setIsLoading(false);
    console.log(response);
    if (response.status !== 201) {
      setSeverity("error");
    } else {
      setSeverity("success");
      setFormData({
        name: null, 
        testingSite: null, 
        orderingInstructions: null,
        container: null,
        collectionInstructions: null,
        frequency: null,
        TAT: null,
        stabilityForAddOn: null,
        externalLink: null,
        image: null
      });
      setImageData(null);
    }
    const newNames = await fetchNames();
    setNames(newNames);
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
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
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
                onChange={handleImageFileChange}
              />
            </div>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="Testing Site"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.testingSite || ""}
              onChange={(e) =>
                setFormData({ ...formData, testingSite: e.target.value })
              }
            />
            <TextField
              label="Ordering Instructions"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.orderingInstructions || ""}
              onChange={(e) =>
                setFormData({ ...formData, orderingInstructions: e.target.value })
              }
            />
            <TextField
              label="Container"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.container || ""}
              onChange={(e) =>
                setFormData({ ...formData, container: e.target.value })
              }
            />
            <TextField
              label="Collection Instructions"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.collectionInstructions || ""}
              onChange={(e) =>
                setFormData({ ...formData, collectionInstructions: e.target.value })
              }
            />
            <TextField
              label="Frequency"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.frequency || ""}
              onChange={(e) =>
                setFormData({ ...formData, frequency: e.target.value })
              }
            />
            <TextField
              label="TAT"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.TAT || ""}
              onChange={(e) =>
                setFormData({ ...formData, TAT: e.target.value })
              }
            />
            <TextField
              label="Stability for Add on Test"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.stabilityForAddOn || ""}
              onChange={(e) =>
                setFormData({ ...formData, stabilityForAddOn: e.target.value })
              }
            />
            <TextField
              label="External Reference Link"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.externalLink || ""}
              onChange={(e) =>
                setFormData({ ...formData, externalLink: e.target.value })
              }
            />
          </div>
          <Button
            disabled={!formData.name}
            variant="contained"
            color="primary"
            type="submit"
            style={{marginTop: "10px"}}
          >
            Submit
          </Button>
          {isLoading && (
            <div style={{ display: "flex" }}>
              <span>Submitting...</span>
              <CircularProgress size={20} style={{ marginLeft: 10 }} />
            </div>
          )}
        </form>
    </>
  );
};

export default Create;
