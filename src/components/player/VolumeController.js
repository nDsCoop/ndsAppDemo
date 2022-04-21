import React, { useState } from "react";
import { Grid, Slider } from "@material-ui/core/";
import { VolumeUp } from "@material-ui/icons/";

const VolumeController = ({ player, setPlayerState }) => {
  const [volume, setVolume] = useState(100);

  const volumeChange = (e, newVal) => {
    setVolume(newVal);
    player.volume = newVal / 100;
    //
  };


  return (

      <Grid container spacing={1} style={{ maxWidth: "150px", color:"rgb(27, 154, 238)", alignItems: "center"}}>
        <Grid item>
          <VolumeUp style={{color:"rgb(27, 154, 238)" }} />
        </Grid>
        <Grid  item xs={3}>
          <Slider style={{color:"rgb(27, 154, 238)" }} value={volume} onChange={volumeChange} />
        </Grid>
      </Grid>
  );
};

export default VolumeController;
