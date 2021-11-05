import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import SessionTimer from "../pomodoro/SessionTimer.js";
import FocusDuration from "../pomodoro/FocusDuration.js";
import BreakDuration from "../pomodoro/BreakDuration.js";
import StartStop from "../pomodoro/StartStop.js"

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

function nextSession(focusDuration, breakDuration) {
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);

  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <FocusDuration session={session} setFocusDuration={setFocusDuration} focusDuration={focusDuration}/>
        </div>
        <div className="col">
          <BreakDuration session={session} setBreakDuration={setBreakDuration} breakDuration={breakDuration}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <StartStop isTimerRunning={isTimerRunning} session={session} setSession={setSession} playPause={playPause} setIsTimerRunning={setIsTimerRunning} classNames={classNames}/>
        </div>
      </div>
      <SessionTimer session={session} breakDuration={breakDuration} focusDuration={focusDuration} />
    </div>
  );
}

export default Pomodoro;