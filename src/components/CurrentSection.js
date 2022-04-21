import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  Suspense,
  lazy
} from "react";

import {
  // BrowserRouter as Router,
  withRouter,
  Route,
  Link,
  Switch
} from "react-router-dom";

// import { AnimatePresence } from "framer-motion";
import {
  Tabs,
  Tab,
  withStyles,
  Grid,
  CircularProgress
} from "@material-ui/core";


import {
  Home,
  Favorite,
  // VideoLibrary,
  History,
  GetApp
} from "@material-ui/icons/";

import { GlobalContext } from "./GlobalState";
import {
  getHistory,
  getLikedSongs,
  getDownloadedSongs,
  removeDownloadingState,
  db
} from "../external/saveSong";

import SettingsPage from "./sections/SettingsPage";
// import the db from save song
import MainPlayer from "../components/player/MainPlayer";
import Errors from "../pages/Error";
// pages
const LoginPage = lazy(() => import("./LoginPage"));
const RenderDatabase = lazy(() => import("./RenderDatabase"));
const SearchResult = lazy(() => import("./SearchResult"));
const HomePage = lazy(() => import("./sections/HomePage"));
const FeedbackForm = lazy(() => import("./sections/FeedbackForm"));
const PrivacyPage = lazy(() => import("./sections/PrivacyPage"));
const DonatePage = lazy(() => import("./sections/DonatePage"));
const ContributorsPage = lazy(() => import("./sections/ContributorsPage"));

// custom styling the tab menus
const CustomTab = withStyles({
  root: {
    background: "#4d6472",
    position: "fixed",
    bottom: "0",
    padding: 0,
    width: "100%",
<<<<<<< HEAD
    zIndex: 1300,
    overflow: "hidden"
=======
    zIndex: 1300
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
  },
  indicator: {
    display: "none"
  },
  // labelIcon: {
  //   margin: 0
  // }
})(Tabs);

const CustomTabs = withStyles({
  root: {
    color: "#FFB2C1",
    fontSize: ".75rem",
    margin: 0,

    "&:hover": {
      color: "#ffffffed",
      opacity: 1
    },
    "&$selected": {
      color: "#fff"
    },
    "&:focus": {
      color: "#FFFFFF"
    }
  },

  selected: {}
})(Tab);

let deferredPrompt = undefined;
let previousLocation;

window.addEventListener("beforeinstallprompt", e => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

const CurrentSection = ({ history, location }) => {
  const [{ currentVideoSnippet, searchResult }] = useContext(GlobalContext);
  console.log(currentVideoSnippet);

  const [songsHistoryState, setSongsHistory] = useState([]);
  const [songsLikedState, setSongsLiked] = useState([]);
  const [songsDownloadedState, setSongsDownloaded] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [redirectState, setRedirectState] = useState(null);
  

  const circularLoader = (
    <Grid
      style={{ height: "100vh" }}
      container
      justify="center"
      alignItems="center"
      className={'default'}
    >
      <CircularProgress />
    </Grid>
  );

  function handleChange(event, newValue) {
    setTabValue(newValue);
  }

  const fetchSongs = useCallback(async () => {
    //it's same as the orders of our tabs
    switch (tabValue) {
      case 1:
        setSongsLiked(await getLikedSongs());
        break;

      case 2:
        setSongsDownloaded(await getDownloadedSongs());
        break;

      case 3:
        setSongsHistory(await getHistory());
        break;

      default:
        break;
    }
  }, [tabValue]);
  //
  useEffect(() => {
    fetchSongs();
  }, [tabValue, fetchSongs]);

  useEffect(() => {
    fetchSongs();
    console.log("fetching the songs");
  }, [updateCount, fetchSongs]);

  useEffect(() => {
    db.on("changes", () => {
      setUpdateCount(c => c + 1);
    });
    // will remove all the songs which are downloading in the first place
    removeDownloadingState();

    const isThisNewUser = localStorage.getItem("isThisNew");
    if (isThisNewUser === "no") {
      setRedirectState(true);
    }
    // if this is not a new user redirect it to home
<<<<<<< HEAD

    
    previousLocation = location;
    history.listen(location => {
      if (location.pathname !== "/ndsweb/music/play" && location.pathname !== "*") {
=======
    previousLocation = location;
    history.listen(location => {
      if (location.pathname !== "/play") {
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
        previousLocation = location;
        console.log(previousLocation);
      }
    });
  }, []);

  useEffect(() => {
    // we will redirect everytime user comes to root page
<<<<<<< HEAD
    if (redirectState && history.location.pathname === "*") {
      history.replace("/ndsweb/music");
=======
    if (redirectState && history.location.pathname === "/") {
      history.replace("/home");
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
    }

    // if the location is not play then we will push new location
  }, [setRedirectState, history, redirectState]);

  const checkPrevLocation = () => {
<<<<<<< HEAD
    console.log("path checkPrevLocation: ", location.pathname);
    if (location.pathname === "/ndsweb/music/play") {
=======
    if (location.pathname === "/play") {
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
      return previousLocation;
    } else {
      return location;
    }
  };

  // we will load the homepage with all the playlists
  const continueToHome = () => {
    localStorage.setItem("isThisNew", "no");
<<<<<<< HEAD
    history.replace("/ndsweb/music");
=======
    history.replace("/");
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8

    if (deferredPrompt) {
      // show the prompt to install app
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    }
  };

  const returnMainPlayer = props => {
    // we will return the main player if the path is not the "/"

<<<<<<< HEAD
    if (window.location.pathname !== "/ndsweb/music") {
=======
    if (window.location.pathname !== "/") {
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
      return <MainPlayer {...props} />;
    } else {
      return null;
    }
  };

  // the set tab value will keep the tab active on their route
  // there are 4 tabs so there will be 3 indexes
  return (
    <div>
      <Suspense fallback={circularLoader}>
        <Switch location={checkPrevLocation()}>
          <Route
            exact
<<<<<<< HEAD
            path="/ndsweb/music"
=======
            path="/page1"
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            render={props => {
              return <LoginPage continueToHome={continueToHome} />;
            }}
          />
<<<<<<< HEAD
        
          <Route
            path="/ndsweb/music/home"
=======
          <Route
            path="/search"
            render={props => <SearchResult videos={searchResult} />}
          />
          <Route
            path="/page1/home"
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            render={props => {
              setTabValue(0);
              return <HomePage />;
            }}
          />
          <Route
<<<<<<< HEAD
            path="/ndsweb/music/liked"
=======
            path="/page1/liked"
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            render={props => {
              setTabValue(1);
              return (
                <RenderDatabase
                  songs={songsLikedState}
                  {...props}
                  key={location.pathname}
                />
              );
            }}
          />
          <Route
<<<<<<< HEAD
            path="/ndsweb/music/downloads"
=======
            path="/page1/downloads"
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            render={props => {
              setTabValue(2);
              return (
                <RenderDatabase
                  songs={songsDownloadedState}
                  key={location.pathname}
                />
              );
            }}
          />
          <Route
<<<<<<< HEAD
            path="/ndsweb/music/history"
=======
            path="/page1/history"
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
            render={props => {
              setTabValue(3);
              return (
                <RenderDatabase
                  songs={songsHistoryState}
                  key={location.pathname}
                />
              );
            }}
          />
<<<<<<< HEAD
          
          <Route
            path="/search"
            render={props => <SearchResult videos={searchResult} />}
          />

          <Route path="/ndsweb/music/settings" component={SettingsPage} />
          <Route path="/ndsweb/music/privacy" component={PrivacyPage} />
          <Route path="/ndsweb/music/feedback" component={FeedbackForm} />
          <Route path="/ndsweb/music/help" component={DonatePage} />
          <Route path="/ndsweb/music/contributors" component={ContributorsPage} />
            
            {/* <Route path="*">
              <HomePage />
            </Route> */}

            <Route component={HomePage} />

        </Switch>
        <Route
            exact
            path="/ndsweb/music"
            render={props => {
              return <LoginPage continueToHome={continueToHome} />;
            }}
          />

        <Route path="/" render={props => returnMainPlayer(props)} />
        
      
        <div style={{ height: currentVideoSnippet.id ? "100px" : "50px" }} />
      </Suspense>
      
=======
          <Route
            path="/page1/app"
            render={props => {
              window.location.replace(
                "/"
              );
              return <div>Redirecting you to play store</div>;
            }}
          />

          <Route path="/page1/settings" component={SettingsPage} />
          <Route path="/page1/privacy" component={PrivacyPage} />

          <Route path="/page1/feedback" component={FeedbackForm} />
          <Route path="/page1/help" component={DonatePage} />
          <Route path="/page1/contributors" component={ContributorsPage} />
          <Route component={Errors} />
        </Switch>
        <Route path="/" render={props => returnMainPlayer(props)} />

        <div style={{ height: currentVideoSnippet.id ? "100px" : "50px" }} />
      </Suspense>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
      {/* if the player is on then return 100px else 50px*/}
      <CustomTab
        value={tabValue}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <CustomTabs
          icon={<Home />}
          aria-label="Home"
          component={Link}
<<<<<<< HEAD
          to="/ndsweb/music/home"
=======
          to="/page1/home"
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
          label="Home"
        />

        <CustomTabs
          icon={<Favorite />}
          aria-label="Liked"
          component={Link}
<<<<<<< HEAD
          to="/ndsweb/music/liked"
=======
          to="/page1/liked"
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
          label="Liked"
        />

        <CustomTabs
          icon={<GetApp />}
          aria-label="Downloads"
          component={Link}
<<<<<<< HEAD
          to="/ndsweb/music/downloads"
=======
          to="/page1/downloads"
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
          label="Downloads"
        />
        <CustomTabs
          icon={<History />}
          aria-label="History"
          component={Link}
<<<<<<< HEAD
          to="/ndsweb/music/history"
=======
          to="/page1/history"
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
          label="History"
        />
      </CustomTab>
    </div>
  );
};

export default withRouter(CurrentSection);
