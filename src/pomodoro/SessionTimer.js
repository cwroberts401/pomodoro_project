import React from "react";
import { secondsToDuration } from "../utils/duration";
import { minutesToDuration } from "../utils/duration";

function sessionTimer ({session, focusDuration, breakDuration}) {

    if (session !== null){
        return (
            <div>
            <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {session?.label} for {session?.label === "Focusing" ? minutesToDuration(focusDuration):minutesToDuration(breakDuration)} minutes
            </h2>
            <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session?.timeRemaining)} remaining {session?.label}
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={(session?.timeRemaining/(session?.label === "Focusing" ?focusDuration*60:breakDuration*60))*-100+100} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${(session?.timeRemaining/(session?.label === "Focusing" ?focusDuration*60:breakDuration*60))*-100+100}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
        </div>
        );
    } else {return null}

}

export default sessionTimer
