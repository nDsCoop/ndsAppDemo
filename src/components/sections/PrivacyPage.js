import React from "react";
import { Typography, Grid } from "@material-ui/core";

const PrivacyPage = () => {
  return (
    <Grid     
    style={{ height: "80vh" }}
    container
    direction="column"
    justify="space-around"
    alignItems="center">
      <div className="form-section-music">
        <Typography variant="h5" gutterBottom={true}>
          The current page has been changed to the Private&Policy in About page, sorry for this disconvenience
        </Typography>
      </div>
       
    </Grid>
  );
};

export default PrivacyPage;
