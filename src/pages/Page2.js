import React from "react";
import App2 from "../components/App2";
import { GlobalState } from "../components/GlobalState";
import '../App.css';
import {Helmet} from "react-helmet";

function App() {
  return (
   <GlobalState>
      <Helmet>
<<<<<<< HEAD
          <title>Music | nDsWeb</title>
=======
          <title>Music | nDsBuilding</title>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
      </Helmet>
      <App2 />
    </GlobalState> 
  );
}

export default App;

// this do not works