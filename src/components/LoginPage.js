import React from "react";
// import { GlobalContext } from "./GlobalState";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Banner from "./Banner";
import GoogleSignIn from "./GoogleSignIn";
// import App2 from "./App2";

// const bgStyle = {
//   background: `url(${bgImg2}) no-repeat`,
//   backgroundPositionX: "50%",
//   width: "100%",
//   height: "100%"
// };



const LoginPage = ({ continueToHome }) => {
  const showSignIn = () => {
    // if user has already closed the popup dont show it
    if (localStorage.getItem("signInClosed") !== "true") {
      return <GoogleSignIn />;
    }
  };

  return (
    
       <Grid  
      style={{ height: "80vh" }}
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    > {showSignIn()}
        <Banner title="nDsMusic" subtitle="Enjoyable Music Experience Without ads">
<<<<<<< HEAD
        <Link to={"/ndsweb/music/home"} className="btn-primary" onClick={continueToHome}>
=======
        <Link to={"/page1/home"} className="btn-primary" onClick={continueToHome}>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
          Continue
        </Link>
        
        </Banner>
    </Grid>
    
   
  );
};
 
export default LoginPage;
