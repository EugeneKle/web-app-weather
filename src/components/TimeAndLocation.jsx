import React from "react";
import { formatToLocalTime } from "../services/weatherService";
function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6 max-sm:my-4">
        <p className="text-white text-xl font-extralight max-sm:text-sm">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3 max-sm:my-1">
        <p className="text-white text-3xl font-medium max-sm:text-xl">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
