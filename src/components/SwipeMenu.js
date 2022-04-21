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
          <ListItem button component={Link} to="/ndsweb/music/settings">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button component={Link} to="/ndsweb/music/feedback">
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
          <ListItem button component={Link} to="/ndsweb/music/help">
            <ListItemIcon>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Help & Support" />
          </ListItem>
          <ListItem button component={Link} to="/ndsweb/music/contributors">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Contributors" />
          </ListItem>
       
          <ListItem button component={Link} to="/ndsweb/music/privacy">
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
