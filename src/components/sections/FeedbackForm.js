import React from "react";
import {
  Grid,
  Typography
} from "@material-ui/core";
// import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
// import axios from "../../apis/axios";
// import { GlobalContext } from "../GlobalState";
// import SnackbarMessage from "../SnackbarMessage";

// let captchaToken;
const FeedbackForm = () => {
  // const [{}, dispatch] = useContext(GlobalContext);

  // const setSnackbarMsg = React.useCallback(
  //   data => {
  //     dispatch({ type: "setSnackbarMsg", snippet: data });
  //   },
  //   [dispatch]
  // );
  
  // const [isSending, setIsSending] = React.useState(false);
  // const formEl = React.useRef(null);

  // const submitForm = async (e) => {
  //   // set state to sending
  //   setIsSending(true);
  //   const formData = new FormData(formEl.current);
  //   const name = formData.get("name");
  //   const email = formData.get("email");
  //   const message = formData.get("message");

  //   e.preventDefault();

  //   const post = {
  //     name: name,
  //     email: email,
  //     message: message,
  //     token: captchaToken,
  //     timestamp: new Date(),
  //     }

  //   await axios
  //         .post('/ndsapi/feedback', post)
  //         .then(function(response) {
  //           // console.log(response.data.status);
  //           console.log(response.data.message);
  //           // also clear the form
  //           formEl.current.reset();
  //           setSnackbarMsg(`Sent your message: ${response.data.message}`);
  //           setIsSending(false);
  //         })
  //         .catch(function(error) {
  //           // console.log(error.response.status);
  //           if (error.response) {
  //             if (error.response.status === 429) {
  //               formEl.current.reset();

  //               setSnackbarMsg("We accept limited feedback!");
  //             }
  //           }
  //           setIsSending(false);
  //         });
  //     };

  // React.useEffect(() => {
  //   loadReCaptcha("6Le1toEUAAAAAITyNwqEMaz3hFAYzciSJDMomrgN");
  // }, []);

  // const verifyCallback = token => {
  //   console.log(token);
  //   captchaToken = token;
  //   const captchaBox = document.querySelector(".grecaptcha-badge");
  //   captchaBox.remove();
  //   // remove captcha badge
  // };

  return (
    <Grid
    style={{ height: "80vh" }}
    container
    direction="column"
    justify="space-around"
    alignItems="center"
    >
      <div className="form-section-music">
      <Typography variant="h5" gutterBottom={true}>
<<<<<<< HEAD
        The current page has been changed to the Feedback in About page, sorry for this disconvenience
=======
        The current page has been changed to the FeedbackApp page, click <a href="/about/feedback">here</a> to continue{" "}
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
      </Typography>
      </div>
      {/* <SnackbarMessage />
      <ReCaptcha
        sitekey="6Le1toEUAAAAAITyNwqEMaz3hFAYzciSJDMomrgN"
        action="action_name"
        verifyCallback={verifyCallback}
      />
      <TextField
        id="outlined-email-input"
        label="Name"
        type="text"
        name="name"
        autoComplete="name"
        margin="normal"
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        id="outlined-email-input"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        id="outlined-email-input"
        label="Feedback"
        multiline
        rows="4"
        type="text"
        name="message"
        autoComplete="feedback"
        margin="normal"
        variant="outlined"
        fullWidth
        required
      />
      {isSending ? (
        <LinearProgress
          style={{
            width: "100%",
            transform: "translateY(-12px)",
            borderRadius: "2px"
          }}
        />
      ) : null}
      <Button
        style={{ marginTop: "10px" }}
        variant="outlined"
        color="primary"
        type="submit"
        disabled={isSending ? true : false}
      >
        {isSending ? "Sending Feedback" : "Send Feedback"}
      </Button> */}
    </Grid>
  );
};

export default FeedbackForm;
