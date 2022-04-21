import React, { useState, useContext, useEffect, useCallback } from "react";

import moon from '../images/moon.svg';
import sun from "../images/sun.svg";

import {
  SwipeableDrawer,
  // Avatar,
  Divider,
  // Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  // Link as MaterialLink
} from "@material-ui/core";

import {
  // AccountCircle,
  Feedback,
  Info,
  People,
  Settings,
  HelpOutline
} from "@material-ui/icons";

import { AnimatePresence } from "framer-motion"

import { Link } from "react-router-dom";

import { GlobalContext } from "./GlobalState";


const SwipeMenu = () => {
  const [{ menuOpen, themeSelectValue }, dispatch] = useContext(GlobalContext);

  const setMenuOpen = data => {
    dispatch({ type: "setMenuOpen", snippet: data });
  };

  const setThemeSelectValue = useCallback(
    data => {
      dispatch({ type: "setThemeSelectValue", snippet: data });
    },
    [dispatch]
  );

  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    if (themeSelectValue === "Dark") {
      setIsNight(true);
    } else {
      setIsNight(false);
    }
  }, [themeSelectValue]);

  const changeTheme = theme => {
    setThemeSelectValue(theme);
    localStorage.setItem("selectedTheme", theme);
  };

  const handleThemeToggle = () => {
    if (!isNight) {
      changeTheme("Dark");
      setIsNight(false);
    } else {
      changeTheme("Default");
      setIsNight(true);
    }
  };

  return (
    <SwipeableDrawer
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      onOpen={() => setMenuOpen(true)}
    >
      <div style={{ width: "300px" }}>
        <div
          style={{
            margin: "35px",
            position: "relative",
            width: "30px",
            height: "30px"
          }}
        >
          <AnimatePresence>
            {/* <motion.img
              key= { isNight ? sun : moon }
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, rotate: "360deg" }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              src={moon}
              className="dayNightToggleBtn"
              alt="sun moon icon"
            /> */}
            <img src={isNight ? sun : moon} className="dayNightToggleBtn" animate={{ scale: 1.5, rotate: "360deg" }} alt="sun moon icon" onClick={() => handleThemeToggle()} />
          </AnimatePresence>
        </div>

        <Divider />

        <List
          component="nav"
          className={"pinkLists"}
          onClick={() => setMenuOpen(false)}
        >
<<<<<<< HEAD
          <ListItem button component={Link} to="/ndsweb/music/settings">
=======
          <ListItem button component={Link} to="/page1/settings">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
<<<<<<< HEAD
          <ListItem button component={Link} to="/ndsweb/music/feedback">
=======
          <ListItem button component={Link} to="/page1/feedback">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
<<<<<<< HEAD
          <ListItem button component={Link} to="/ndsweb/music/help">
=======
          <ListItem button component={Link} to="/page1/help">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            <ListItemIcon>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Help & Support" />
          </ListItem>
<<<<<<< HEAD
          <ListItem button component={Link} to="/ndsweb/music/contributors">
=======
          <ListItem button component={Link} to="/page1/contributors">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Contributors" />
          </ListItem>
       
<<<<<<< HEAD
          <ListItem button component={Link} to="/ndsweb/music/privacy">
=======
          <ListItem button component={Link} to="/page1/privacy">
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Privacy & Policy" />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default SwipeMenu;
