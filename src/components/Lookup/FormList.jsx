import React from 'react';
import { Typography, List, ListItem, Link, Divider } from '@mui/material';
import fetchPdf from '../../api/fetchPdf';

const FormsComponent = ({ name, associatedPdfs, setOpen, setMessage, setSeverity }) => {
  const handlePdfClick = async (pdfName) => {
    try {
      const response = await fetchPdf(name, pdfName); // Adjust the parameters as needed
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      } else {
        console.error(`Error fetching File: ${pdfName}`);
        setSeverity("error");
        setMessage(`Error fetching File: ${pdfName}`);
        setOpen(true);
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Forms
      </Typography>
      <Divider />
      {associatedPdfs && associatedPdfs.length > 0 ? (
        <List>
          {associatedPdfs.map((pdf, index) => (
            <ListItem key={index}>
              <Link
                component="button" // Use a button as a link
                variant="body2" // Use a variant that looks like a hyperlink
                color="primary" // Use a primary color for links
                onClick={() => handlePdfClick(pdf.pdfName)}
                style={{ cursor: 'pointer' }} // Change cursor on hover
              >
                {pdf.label}
              </Link>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">
          No forms available for this lab item.
        </Typography>
      )}
    </div>
  );
};

export default FormsComponent;
