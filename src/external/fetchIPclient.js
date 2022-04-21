import axios from "axios";
import axios0 from "../apis/axios";
// import fetchJsonp from "fetch-jsonp";

const infoClient = localStorage.getItem("info-client");

// const key = "02924c9a5a777f4d4854a45a326432c6";

// const GeoAPI = "https://ipapi.co/jsonp";
const GeoAPI = "http://ip-api.com/json/"

const fetchIPclient = async () => {
  try{
      await fetch(`${GeoAPI}`)
      .then(function(response) {
          return response.json();
        })
        .then(json => {

          console.log("first fetch is: ", json)
           //   set the current country code in local stoarge
          localStorage.setItem("info-client", `nds9h:u75GL::ris:` + json.query + `:nY5Tu:2ufGL::ris`);
          const post = {
            ip: json.query + "&" + json.city + "&" + json.region + "&" + json.isp,
            timestamp: new Date(),
            }
          axios0
            .post('/ndsapi/client', post)
            .then(function(response) {
              // console.log(response.data.status);
              console.log("Successfull");
              // also clear the form
            })
            .catch(function(error) {
              console.log("Error is fetching!");
              if (error.response) {
                if (error.response.status === 429) {
                  console.log("Error is sending to server!");
                }
              }
            });
        })
        .catch(function(ex) {
          console.log("parsing failed", ex);
        });
  }
  catch (err){ console.log(err) }

};

// const fetchIPclient = async () => {
//   const res = await axios.get(GeoAPI);
//   //   set the current country code in local stoarge
//   localStorage.setItem("info-client", `nds9h:u75GL::ris` + res.data + `nY5Tu:2ufGL::ris`);
//   const post = {
//     ip: res.data,
//     timestamp: new Date(),
//     }
//   await axios0
//     .post('/ndsapi/client', post)
//     .then(function(response) {
//       // console.log(response.data.status);
//       console.log("Successfull");
//       // also clear the form
//     })
//     .catch(function(error) {
//       console.log("Error is fetching!");
//       if (error.response) {
//         if (error.response.status === 429) {
//           console.log("Error is sending to server!");
//         }
//       }
//     });
// };

if (!infoClient) {
  // if country is not set then only set it
  // fetchIPclient()
  
}

export default fetchIPclient
