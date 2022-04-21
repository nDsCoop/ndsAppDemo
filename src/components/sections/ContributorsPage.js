import React from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { pink } from "@material-ui/core/colors";

// const useStyles = makeStyles({
//   avatar: {
//     margin: 10,
//     width: 80,
//     height: 80
//   },
//   avatatContainer: {
//     width: "50%"
//   },
//   divider: {
//     width: "100%",
//     margin: 10
//   },
//   miniContainer: {
//     margin: 10,
//     "& div": {
//       margin: "2px"
//     },
//     "& .MuiAvatar-root": {
//       // width: 50,
//       // height: 50,
//       marginRight: 20,
//       marginLeft: 10,
//       background: pink[500],
//       color: "#fff"
//     }
//   }
// });

const ContributorsPage = () => {
  // const classes = useStyles();

  return (
      <Grid     
      style={{ height: "80vh" }}
      container
      direction="column"
      justify="space-around"
      alignItems="center">
        <div className="form-section-music">
          <Typography variant="h5" gutterBottom={true}>
<<<<<<< HEAD
            The current page has been changed to the Contributors in About page, sorry for this disconvenience
=======
            The current page has been changed to the ContributorsApp page, click <a href="/about/contributes">here</a> to continue{" "}
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
          </Typography>
        </div>
         
      </Grid>
  );
};

export default ContributorsPage;
