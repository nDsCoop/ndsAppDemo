import React, { useEffect, useContext, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import { useSwipeable } from "react-swipeable";
import PlayPauseButton from "./PlayPauseButton";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";
import MusicArt from "./MusicArt";
import TimelineController from "./TimelineController";
import TopBar from "./TopBar";
import MiniMusicArt from "./MiniMusicArt";
import RelatedVideos from "../RelatedVideos";
import getAudioLink from "../../apis/getAudioLink";
import youtubeSearch from "../../apis/youtubeSearch";
import { updatePlayingSong } from "../../external/saveSong";

import { GlobalContext } from "../GlobalState";
import _ from 'lodash';
import {
  getDownloadedSongs,
} from "../../external/saveSong";

// window.onbeforeunload = function() {
//   return 'You have unsaved changes!';
// }
let relatedVideosVar;

const MainPlayer = ({ location, history }) => {
  let params = new URLSearchParams(location.search);
  console.log("path id in mainPlayer: ", params.get("id"));
  const [{ currentVideoSnippet, themeSelectValue }, dispatch] = useContext(
    GlobalContext
  );

  const setCurrentVideoSnippet = data => {
    dispatch({ type: "setCurrentVideoSnippet", snippet: data });
  };

  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isItFromPlaylist, setIsItFromPlaylist] = useState(false);
  const [songsDownloadedState, setSongsDownloaded] = useState([]);
  const [audioState, setAudioState] = useState(null);
  // there will be 4 states
  // loading, loaded, playing, paused

  const [playerState, setPlayerState] = useState(null);
  // there will be 3 states
  // maximized, minimized, playlist

  const [minimized, setMinimized] = useState(true);
  const [isRepeatOn, setIsRepeatOn] = useState(0);
  const [isLoadList, setIsLoadList] = useState(false);
  // const [isLoopList, setIsLoopList] = useState(false)
  const [rating, setRating] = useState("none");
  const [isNextFromMini, setIsNextFromMini] = useState(false);
  // const [audioURL, setAudioURL] = useState(null);
  const body = document.querySelector("body");

  const audioPlayer = useRef();
  const player = audioPlayer.current;

  const proccessStateLoopList = (keyState) => {
    console.log("here", keyState)
   if(keyState === 0){
    setIsRepeatOn(0)
   }else if(keyState === 1){
    setIsRepeatOn(1)
   }else{
    setIsRepeatOn(2)
   }
    
  }
   


  const setupMediaSessions = () => {
    if ("mediaSession" in navigator) {
      console.log("navigator setupped");

      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentVideoSnippet.title,
        artist: currentVideoSnippet.channelTitle,
        artwork: [
          {
            src: currentVideoSnippet.sdThumbnail,
            sizes: "512x512",
            type: "image/png"
          }
        ]
      });
      navigator.mediaSession.setActionHandler("play", () => {
        /* Code excerpted. */
        playAudio();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        /* Code excerpted. */
        audioPlayer.current.pause();
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        playPrevious();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        playNext();
      });
    }
  };

  const playAudio = () => {
    audioPlayer.current
      .play()
      .then(_ => {
        // Automatic playback started!
        // Show playing UI.
        console.log("audio played auto");
        setupMediaSessions();
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
        console.log("playback prevented");
        setAudioState("paused");
      });
  };


  useEffect(() => {
    console.log("state changed triggedred");
    const getAudio = async data => {
      // audioPlayer.current.src = "";
      // maximize the player every time id changes
      // only if playlist is not open
      if (playerState !== "playlist" && !isNextFromMini) {
        setPlayerState("maximized");
        //
        console.log("maximizing here yar and state is", playerState);
      }

      setTimeout(() => {
        setIsNextFromMini(false);
        // change it back to false
      }, 200);

      setAudioState("loading");
      const res = await getAudioLink.get("/song", {
        params: { id: data }
      });

      // set the audio data
      // const proxyURL = "http://localhost:9150/proxy/";
      audioPlayer.current.src = res.data;
      playAudio();

      // var audioContext = new AudioContext();

      // var track = audioContext.createMediaElementSource(audioPlayer.current);
      // track.connect(audioContext.destination);
    };

    if (currentVideoSnippet.audio) {
      console.log("yes its downloaded we will play from local file");
      // maximize the player every time id changes

      setPlayerState("maximized");
      setAudioState("loading");
      audioPlayer.current.src = window.URL.createObjectURL(
        currentVideoSnippet.audio
      );
      playAudio();
    } else if (currentVideoSnippet.id) {
      getAudio(currentVideoSnippet.id);
    }

    if (currentVideoSnippet.id) {
      const searchRelated = async () => {
        const res = await youtubeSearch.get("/search", {
          params: {
            relatedToVideoId: currentVideoSnippet.id,
            maxResults: 20
          }
        });

        //proccess fail by result turn back

        console.log("res.data relate song", _.tail(res.data.items));

        let updated = res.data.items.filter(function(val){ return val.snippet !== undefined; });

        console.log(updated);

        setRelatedVideos(_.tail(res.data.items));

      };

      // if its not from the mini next button then only change history
      if (!isNextFromMini) {
        // if the click is not from playlist then only we will search for realated video
        if (!isItFromPlaylist) {
          // console.log("searching for related vids", relatedVideos);
          // if player is in playlist mode we will just replace history else push it
          if (location.pathname !== "/ndsweb/music") {
            // prevent duplicating history
            history.push(`/ndsweb/music/play?id=${currentVideoSnippet.id}`);
          }

          searchRelated();
        } else {
          history.replace(`/ndsweb/music/play?id=${currentVideoSnippet.id}`);
          setIsItFromPlaylist(false);
        }
      }

      console.log(currentVideoSnippet);
    }

    // set rating to none when we load new song
    setRating("none");
  }, [currentVideoSnippet, setIsItFromPlaylist]);

  useEffect( async ()  => {

    setSongsDownloaded(await getDownloadedSongs());

  }, [])

  
  // useEffect(() => {
  //   if(isLoadList){
      
  //   }

  // }, [isLoadList])
  // useEffect(() => {
  //   console.log("from playlist", isItFromPlaylist);
  // }, [isItFromPlaylist]);

  useEffect(() => {
    if(isLoadList){
      relatedVideosVar = songsDownloadedState;
    }else
    if(relatedVideos){
      relatedVideosVar = relatedVideos;
    }
    
    console.log("related", relatedVideos);
  }, [relatedVideos, isLoadList]);

  useEffect(() => {
    console.log("isnext state", isNextFromMini);
  }, [isNextFromMini]);

  const setAudioSrcAndPlay = async id => {
    const res = await getAudioLink.get("/song", {
      params: { id: id }
    });

    // set the audio data
    audioPlayer.current.src = res.data;
    playAudio();
  };

  const setVideoSnippet = video => {
    try{
      setCurrentVideoSnippet({
        id: video.id.videoId,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        maxThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/hqdefault.jpg`,
        sdThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/sddefault.jpg`
        // this is the url of the max resolution of thumbnail
      });
    }
    catch(err)
    {
      console.error('err', err)
    }
    // if window is minimized then only we will run this function
    if (document.hidden) {
      setAudioSrcAndPlay(video.id.videoId);
    }
  };
  const setVideoSnippet2 = video => {
    try{
      setCurrentVideoSnippet({
        id: video.videoId,
        title: video.title,
        channelTitle: video.channelTitle,
        maxThumbnail: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
        sdThumbnail: `https://img.youtube.com/vi/${video.videoId}/sddefault.jpg`
        // this is the url of the max resolution of thumbnail
      });
    }
    catch(err)
    {
      console.error('err', err)
    }
    // if window is minimized then only we will run this function
    if (document.hidden) {
      setAudioSrcAndPlay(video.videoId);
    }
  };

  const playNext = () => {
    // also set this is from playlist
    setIsItFromPlaylist(true);
    console.log("play next related videos", relatedVideos);
    // find the index of playing song in the playlist

    if(isLoadList){
      const currentIndex2 = relatedVideosVar.findIndex(
        video => video.videoId === currentVideoSnippet.id
      );
      if(currentIndex2 === relatedVideosVar.length-1 && isRepeatOn === 2){
        let video2 = relatedVideosVar[0];
        setVideoSnippet2(video2);
      }else{
        let video2 = relatedVideosVar[currentIndex2 + 1];
        setVideoSnippet2(video2);
      } 
    }else{

      const currentIndex = relatedVideosVar.findIndex(
        video => video.id.videoId === currentVideoSnippet.id

      );
      if(currentIndex === relatedVideosVar.length-1 && isRepeatOn === 2){
        let video = relatedVideosVar[0];
        setVideoSnippet(video);
      }else{
        let video = relatedVideosVar[currentIndex + 1];
        setVideoSnippet(video);
      } 
      
    }
    

  };

  const playPrevious = () => {
    setIsItFromPlaylist(true);

    // if the player time is greater than 5 sec we will move the time to 0
    if (player.currentTime > 5) {
      player.currentTime = 0;
    } else
      if(isLoadList){
        const currentIndex = relatedVideosVar.findIndex(
          video => video.videoId === currentVideoSnippet.id
         
        );
        let video;
        if (currentIndex !== -1) {
          video = relatedVideosVar[currentIndex - 1]; //we will play the next song
          setVideoSnippet2(video);
        } else {
          player.currentTime = 0;
        }
      } else {
        const currentIndex = relatedVideosVar.findIndex(
          video => video.id.videoId === currentVideoSnippet.id
        
        );
        let video;
        if (currentIndex !== -1) {
          video = relatedVideosVar[currentIndex - 1]; //we will play the next song
          setVideoSnippet(video);
        } else {
          player.currentTime = 0;
      }
    }
  };

  let playerStyle = {
    position: "fixed",
    right: 0,
    bottom: 0,
    background: "#fff",
    width: "100%",
    height: "100%",
    zIndex: 1400,
    display: "inline block",
    transition: "all .3s ease"
  };

  if (playerState === "minimized") {
    playerStyle.transform = "translateY(calc(100% - 106px))";
    playerStyle.zIndex = 0;
    // if theme is not dark then only apply the pink style
    if (themeSelectValue === "Dark") {
      playerStyle.background = "#333";
    } else {
      playerStyle.background = "#e91e63";
    }
    // playerStyle.bottom = "48px";
    // calculate the top height and we are subtracting 148px becz
    // 48 is the value of menu bar and 100px is minimized height
    // make body overflow scroll 😝
    body.style.overflow = "auto";
  }

  if (playerState === "maximized") {
    // make body overflow hidden 🙈
    body.style.overflow = "hidden";
    if (themeSelectValue === "Dark") {
      playerStyle.background = "#333";
    }
  }

  if (playerState === "playlist") {
    playerStyle.transform = "translateY(-418px)";
  }

  const expandPlayer = (e) => {
    e.preventDefault();
    if (playerState === "minimized") {
      setPlayerState("maximized");
      setMinimized(true);
      history.push({
        pathname: "/ndsweb/music/play",
        search: `?id=${currentVideoSnippet.id}`,
        state: { modal: true }
      });
    }
  };

  const toggleMaxPlaylist = () => {
    if (playerState === "playlist") {
      setPlayerState("maximized");
    } else {
      setPlayerState("playlist");
    }
    console.log("Maximize the playlist");
  };

  const updateSongDB = async () => {
    const rating = await updatePlayingSong(currentVideoSnippet);
    //  it will update song on db and return the rating
    setRating(rating);
    console.log(rating);
  };

  // this will be fired when song is ended
  const songEnded = () => {
    // if repeat is false we will play next else just set the time to 0
    if (isRepeatOn === 0 || isRepeatOn === 2) {
      playNext();
    } else if(isRepeatOn === 1){
      audioPlayer.current.currentTime = 0;
      playAudio();
    }
  };

  let initPosition = 0;
  const containerRef = useRef(null);

  const swipeHandlerMaximized = useSwipeable({
    onSwipedDown: e => {
      setPlayerState("minimized");
      history.goBack();
    },
    onSwiping: e => {
      // console.log(e);
      // getting the event for touches to extract the position
      if (initPosition === 0) {
        initPosition = e.event.changedTouches[0].screenY;
      }

      const screenY = e.event.changedTouches[0].screenY;
      let positionDifference = Math.round(screenY - initPosition);
      if (positionDifference < 1) {
        positionDifference = 0;
      }

      const containerRefStyle = containerRef.current.style;
      containerRefStyle.transform = `translateY(${positionDifference}px)`;
      containerRefStyle.transition = "none";
    },
    onSwiped: e => {
      initPosition = 0;
      containerRef.current.style = "";
      // we will make the initial position 0 again after user leaves the screen
    },
    onSwipedUp: e => {
      if (playerState === "minimized") {
        setPlayerState("maximized");
      }
    },
    onSwipedRight: e => {
      const playTimeout = setTimeout(() => {
        clearTimeout(playTimeout);
        playNext();
      }, 250);
    },
    onSwipedLeft: e => {
      const playTimeout = setTimeout(() => {
        clearTimeout(playTimeout);
        playPrevious();
      }, 250);
    }
  });

  const swipeHandlerMin = useSwipeable({
    onSwipedUp: e => {
      expandPlayer();
    }
  });

  useEffect(() => {
 
    if (location.pathname === "/ndsweb/music/play" && !currentVideoSnippet.id) {
      console.log("history is in play fetching song times 2");

      fetchAndSetCurrentVideoSnippet(params.get("id")); // math will give the song id from
    }
    // we will only change if its push  otherwise while changing song from playlist changes the state

    // Listen for changes to the current location.

    const unlisten = history.listen(location => {
      // location is an object like window.location
      if (location.pathname === "/ndsweb/music/play") {
        // we will only change if its push  otherwise while changing song from playlist changes the state
        //## hidden 3 line after
        if (history.action !== "REPLACE") {
          setPlayerState("maximized");
          console.log("set player state to maximized");
        }

      } else {
        // setPlayerState("minimized");
        // console.log("set player state to minimized");
      }
      console.log(history);
    });
  }, [history]);

  useEffect(() => {
    console.log(playerState);
  }, [playerState]);

  const returnMinMaxClass = () => {
    if (playerState === "minimized") {
      return "playerMinimized";
    } else if (playerState === "playlist") {
      return "playerPlaylist";
    }
  };

  const returnMaximizedPlayer = () => {
    if (playerState === "maximized" || playerState === "playlist") {
      return (
        <>
          <Grid
            container
            direction="column"
            className="main-player-inner"
            style={{
              height: " calc(100vh - 46px)",
              justifyContent: "space-evenly"
            }}
          >
            <TopBar
              song={currentVideoSnippet}
              player={player}
              setPlayerState={setPlayerState}
              history={history}
            />
            <div {...swipeHandlerMaximized} className="musicArtContainer">
              <MusicArt
                data={currentVideoSnippet}
                rating={rating}
                audioEl={player}
              />
            </div>
            <TimelineController audioState={audioState} player={player} />

            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              style={{ maxWidth: "290px", height: "80px", margin: "0 auto" }}
            >
              <PreviousButton playPrevious={playPrevious} />
              <PlayPauseButton player={player} audioState={audioState} />
              <NextButton onPlayNext={playNext} />
            </Grid>
          </Grid>
          <RelatedVideos
            toggleMaxPlaylist={toggleMaxPlaylist}
            setPlaylist={() => setIsItFromPlaylist(true)}
            playerState={playerState}
            relatedVideos={relatedVideos}
            setRelatedVideos={data => setRelatedVideos(data)}
            isRepeatOn={isRepeatOn}
            // this will set the repeat setting
            setIsRepeatOn={(key) => proccessStateLoopList(key)}
            songsDownloadedState = {songsDownloadedState}
            isLoadList={isLoadList}
            // this will set the using load list next song setting
            setIsLoadList={() => {
              console.log("set using Loaded List song")
              setIsLoadList(!isLoadList);
            }}
          />
        </>
      );
    }
  };

  const returnMinimizedPlayer = () => {
    if (playerState === "minimized" && currentVideoSnippet.id) {
      return (
        <div {...swipeHandlerMin}>
          <MiniMusicArt
            // we are making an object for props we will pass it to play pause button through mini music art
            playPause={{
              player: player,
              minimized: minimized,
              audioState: audioState
            }}
            playNext={e => {
              e.stopPropagation();
              setIsNextFromMini(true);
              playNext();
            }}
            data={currentVideoSnippet}
            emptyPlayer={e => {
              e.stopPropagation();
              setCurrentVideoSnippet([]);
            }}
          />
          <TimelineController
            audioState={audioState}
            player={player}
            minimized={minimized}
          />
        </div>
      );
    }
  };

  const fetchAndSetCurrentVideoSnippet = id => {
    youtubeSearch
      .get("videos", {
        params: {
          id: id
        }
      })
      .then(res => {
        const item = res.data.items[0];
        console.log(currentVideoSnippet);
        setCurrentVideoSnippet({
          id: item.id,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          maxThumbnail: `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`,
          sdThumbnail: `https://img.youtube.com/vi/${item.id}/sddefault.jpg`
          // this is the url of the max resolution of thumbnail
        });
      });
  };

  if (!currentVideoSnippet.id) {
    return null;
  }

  return (
    <div
      // drag="y"
      // dragConstraints={{ top: 0, bottom: 600 }}
      ref={containerRef}
      // style={playerStyle}
      onClick={expandPlayer}
      className={"mediaPlayerContainer " + returnMinMaxClass()}
    >
      {returnMaximizedPlayer()}
      {returnMinimizedPlayer()}
      <audio
        // onTimeUpdate={timeUpdate}
        onLoadStart={() => {
          setAudioState("loading");
        }}
        id="audio-element"
        onLoadedData={updateSongDB}
        // crossOrigin="anonymous"
        onPlay={() => setAudioState("playing")}
        onPlaying={() => setAudioState("playing")}
        onPause={() => setAudioState("paused")}
        onEnded={songEnded}
        autoPlay
        ref={audioPlayer}
        // type="audio/mp4"
      />
    </div>
  );
};

export default MainPlayer;
