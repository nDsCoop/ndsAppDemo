import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiRepeatOneLine, RiRepeat2Fill, RiHome2Line} from 'react-icons/ri';
import { TiArrowShuffle, TiArrowLoop } from 'react-icons/ti';


import {
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  Grid,
  LinearProgress
} from "@material-ui/core";

import {
  MusicVideo,
  // LibraryMusic,
  // Shuffle,
  // Repea
  KeyboardArrowUp,
  KeyboardArrowDown,
  // RepeatOne
} from "@material-ui/icons";


import { GlobalContext } from "./GlobalState";

let renderResult, renderResult2;

// written by @bushblade
const shuffle = arry =>
  arry.reduce(
    (acc, _, i) => {
      const rnd = Math.floor(Math.random() * acc.length),
        temp = acc[i];
      acc[i] = acc[rnd];
      acc[rnd] = temp;
      return acc;
    },
    [...arry]
  );

const RelatedVideos = ({
  toggleMaxPlaylist,
  setPlaylist,
  playerState,
  relatedVideos,
  setRelatedVideos,
  setIsRepeatOn,
  songsDownloadedState,
  isRepeatOn,
  isLoadList,
  setIsLoadList
}) => {
  const [{}, dispatch] = useContext(GlobalContext);

  const setCurrentVideoSnippet = data => {
    dispatch({ type: "setCurrentVideoSnippet", snippet: data });
  };

 

  
  
  const handleShuffleClick = () => {

    if(isLoadList){
      console.log("set next ",songsDownloadedState);
      setRelatedVideos(shuffle(songsDownloadedState));

    }else{
      console.log("set next ", relatedVideos);
      setRelatedVideos(shuffle(relatedVideos));
    }
    
  };

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300
  };
  
  const handleClick = video => {
    // set all the info of current clicked video in this object
    setCurrentVideoSnippet({
      id: video.id.videoId,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      maxThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/maxresdefault.jpg`,
      sdThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/sddefault.jpg`
      // this is the url of the max resolution of thumbnail
    });
    setPlaylist();
    // window.location.pathname.replace(`/ndsappbeta/music/play?id=${video.videoId}`);
  };
  const handleClick2 = video => {
    // set all the info of current clicked video in this object
    setCurrentVideoSnippet({
      id: video.videoId,
      title: video.title,
      channelTitle: video.channelTitle,
      maxThumbnail: `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
      sdThumbnail: `https://img.youtube.com/vi/${video.videoId}/sddefault.jpg`
      // this is the url of the max resolution of thumbnail
    });
    setPlaylist();
    // window.location.pathname.replace(`/ndsappbeta/music/play?id=${video.videoId}`);
  };

  try{

    if ((relatedVideos.length > 1) || (songsDownloadedState.length > 1)) {
      
      if(isLoadList){
        renderResult2 = songsDownloadedState.map(song => {
          return (
            <motion.li key={song.videoId} positionTransition={spring}>
              <ListItem
                button
                onClick={() => handleClick2(song)}
              >
                <ListItemIcon>
                  <MusicVideo style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText
                  primary={song.title.slice(0, 40)}
                  secondary={song.channelTitle.slice(0, 40)}
                />
              </ListItem>
            </motion.li>
          );
        });
      }else{
        renderResult = relatedVideos.map(song => {
          console.log("title ", song.snippet);
         
          return (
            <motion.li key={song.id.videoId} positionTransition={spring}>
              <ListItem
                button
                onClick={() => handleClick(song)}
              >
                <ListItemIcon>
                  <MusicVideo style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText
                  primary={song.snippet.title.slice(0, 40)}
                  secondary={song.snippet.channelTitle.slice(0, 40)}
                />
              
              </ListItem>
            </motion.li>
          );
        })
      }
      
    } else {
      return <LinearProgress />;
    }

  } catch (err) {
    console.log(err)
  }
  

  const returnPlaylistExpandBtn = () => {
    if (playerState === "playlist") {
      return <KeyboardArrowDown onClick={toggleMaxPlaylist} />;
    } else {
      return <KeyboardArrowUp onClick={toggleMaxPlaylist} />;
    }
  };

  return (
    <div className="RelatedVideoContainer">
      <Grid
        className={"playlistHeader"}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        
        <Link to={"/music/home"}>
        <RiHome2Line className="cssIcons" />
        </Link>
        {isLoadList ? (
          <Typography variant="h6" onClick={setIsLoadList}>Loaded List</Typography>
        ) : (
          <Typography variant="h6" onClick={setIsLoadList}>Related List</Typography>
        )}
        
        <TiArrowShuffle className="cssIcons" onClick={handleShuffleClick} />
        {/* this will show the repeat button and repeat the song */}
        {(isRepeatOn === 1) ? (
          <RiRepeatOneLine className="cssIcons" onClick={() => setIsRepeatOn(2)} />
        ) : <>
          {
            (isRepeatOn === 0) ? (<RiRepeat2Fill className="cssIcons" onClick={() =>setIsRepeatOn(1)} />)
          :
          (<TiArrowLoop className="cssIcons" onClick={() =>setIsRepeatOn(0)} />)
          }
          
        </>}
        {returnPlaylistExpandBtn()}
      </Grid>
      <List dense={true}>{isLoadList? renderResult2 : renderResult}</List>
    </div>
  );
};

export default RelatedVideos;
