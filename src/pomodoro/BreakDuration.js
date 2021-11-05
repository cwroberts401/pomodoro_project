import React from "react";
import { minutesToDuration } from "../utils/duration";

function breakDuration({session, setBreakDuration, breakDuration}){
    return (
        <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            Break Duration: {minutesToDuration(breakDuration)}
          </span>
          <div className="input-group-append">
            <button
              onClick={() => {setBreakDuration((currentDuration) => Math.max((currentDuration - 1),1))}}
              disabled={session}
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
            >
              <span className="oi oi-minus" />
            </button>
            <button
              onClick={() => {setBreakDuration((currentDuration) => Math.min((currentDuration + 1),15))}}
              disabled={session}
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    )
}

export default breakDuration