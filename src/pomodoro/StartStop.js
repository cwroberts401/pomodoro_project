import React from "react";

function startStop({isTimerRunning, session, setSession, playPause, setIsTimerRunning, classNames}){
return (<div
className="btn-group btn-group-lg mb-2"
role="group"
aria-label="Timer controls"
>
<button
  type="button"
  className="btn btn-primary"
  data-testid="play-pause"
  title="Start or pause timer"
  onClick={playPause}
>
  <span
    className={classNames({
      oi: true,
      "oi-media-play": !isTimerRunning,
      "oi-media-pause": isTimerRunning,
    })}
  />  
</button>
<button
  disabled={!session}
  onClick={() => {setSession((currentDuration) => currentDuration = null); setIsTimerRunning((running) => running=false);}}
  type="button"
  className="btn btn-secondary"
  data-testid="stop"
  title="Stop the session"
>
  <span className="oi oi-media-stop" />
</button>
</div>)
}


export default startStop;
