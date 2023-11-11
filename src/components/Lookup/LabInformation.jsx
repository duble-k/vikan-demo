import React from 'react';
import { Typography, Grid, Divider, Link } from '@mui/material';

const LabInformation = ({ result }) => {
  return (
    <div>
      {/* Name and Image */}
      <Typography variant="h6">
        {result.name}
      </Typography>
      <Divider />
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {result.image && (
          <img src={result.image} alt="Lab Image" style={{ maxWidth: '100%' }} />
        )}
      </div>

      {/* Details split into two columns */}
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={5}>
        {result.testingSite && (
            <>
                <Typography style={{ color: 'black' }}>Testing Site:</Typography>
                <Typography style={{ color: 'grey' }}>{result.testingSite}</Typography>
            </>
          )}
        {result.orderingInstructions && (
            <>
                <Typography style={{ color: 'black' }}>Ordering Instructions:</Typography>
                <Typography style={{ color: 'grey' }}>{result.orderingInstructions}</Typography>
            </>
          )}
        {result.container && (
            <>
                <Typography style={{ color: 'black' }}>Container:</Typography>
                <Typography style={{ color: 'grey' }}>{result.container}</Typography>
            </>
          )}
        {result.frequency && (
            <>
                <Typography style={{ color: 'black' }}>Frequency:</Typography>
                <Typography style={{ color: 'grey' }}>{result.frequency}</Typography>
            </>
          )}
        {result.TAT && (
            <>
                <Typography style={{ color: 'black' }}>TAT:</Typography>
                <Typography style={{ color: 'grey' }}>{result.TAT}</Typography>
            </>
          )}
        {result.stabilityForAddOn && (
            <>
                <Typography style={{ color: 'black' }}>Stability for Add-On:</Typography>
                <Typography style={{ color: 'grey' }}>{result.stabilityForAddOn}</Typography>
            </>
          )}
        </Grid>

        {/* Vertical Divider */}
        <Grid item xs={1}>
          <Divider orientation="vertical" style={{ height: '100%' }} />
        </Grid>

        {/* Right Column */}
        <Grid item xs={6}>
        {result.collectionInstructions && (
            <>
                <Typography style={{ color: 'black' }}>Collection Instructions:</Typography>
                <Typography style={{ color: 'grey' }}>{result.collectionInstructions}</Typography>
            </>
          )}
        {result.externalLink && (
            <>
                <Typography style={{ color: 'black' }}>For all other information:</Typography>
                <Link
                    href={result.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'blue', cursor: 'pointer' }}
                    >
                    {result.externalLink}
                </Link>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default LabInformation;
