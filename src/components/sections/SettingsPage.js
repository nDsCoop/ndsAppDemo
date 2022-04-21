import React, { useContext, useEffect, useCallback } from "react";
import {
  // Container,
  FormControl,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Box,
  Typography,
  Grid
} from "@material-ui/core";

import { GlobalContext } from "../GlobalState";

export const useCheckDarkmode = () => {
  const [, dispatch] = useContext(GlobalContext);
  const setThemeSelectValue = useCallback(
    data => {
      dispatch({ type: "setThemeSelectValue", snippet: data });
    },
    [dispatch]
  );
  const checkDarkMode = () => {
    const selectedTheme = localStorage.getItem("selectedTheme");

    // we will check if system dark mode is enabled or not

    // const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    // colorScheme.addEventListener("change", e => {
    //   if (e.matches) {
    //     // if it matches we will set it to dark else default
    //     setThemeSelectValue("Dark");
    //   } else {
    //     setThemeSelectValue("Default");
    //   }
    // });
    if (selectedTheme) {
      console.log(selectedTheme);
      setThemeSelectValue(selectedTheme);

      const date = new Date();
      const hrs = date.getHours();

      // if the theme is auto then only do it
      if (selectedTheme === "Auto") {
        if (hrs >= 18 || hrs <= 6) {
          setThemeSelectValue("Dark");
        } else {
          setThemeSelectValue("Default");
        }
      }
    }
  };

  return { checkDarkMode };
};

const SettingsPage = () => {
  const [{ themeSelectValue }, dispatch] = useContext(GlobalContext);
  const setThemeSelectValue = useCallback(
    data => {
      dispatch({ type: "setThemeSelectValue", snippet: data });
    },
    [dispatch]
  );
  const handleThemeChange = e => {
    setThemeSelectValue(e.target.value);
    localStorage.setItem("selectedTheme", e.target.value);
  };

  useEffect(() => {
    console.log(themeSelectValue);
  }, [themeSelectValue]);

  const selectComp = (
    <Box m={1}>
      
      <Select
        value={themeSelectValue}
        onChange={handleThemeChange}
        displayEmpty
        name="age"
      >
        <MenuItem value="Default">Default</MenuItem>
        <MenuItem value="Dark">Dark</MenuItem>
        <MenuItem value="Auto">Auto</MenuItem>
      </Select>
    </Box>
  );
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
          Setting theme background{" "}
      </Typography>
      <FormControl component="fieldset">
        <FormGroup row>
          <FormControlLabel
            labelPlacement="start"
            label="Select Theme "
            value="top"
            control={selectComp}
          />
        </FormGroup>
      </FormControl>
    </div>
  </Grid>
      
    
  );
};
export default SettingsPage;
