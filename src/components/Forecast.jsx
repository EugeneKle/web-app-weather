import React from "react";
import { iconUrlFromCode } from "../services/weatherService";
function Forecast({ title, items }) {
  const renderedItems = items.map((item) => {
    return (
      <div
        key={item.title}
        className="flex flex-col items-center justify-center"
      >
        <p className="font-light text-sm">{item.title}</p>
        <img
          className="w-12 my-1"
          src={iconUrlFromCode(item.icon)}
          alt={item.title}
        />
        <p className="font-medium">{item.temp.toFixed()}°</p>
      </div>
    );
  });

  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div
        className="flex flex-row items-center justify-between
      text-white"
      >
        {renderedItems}
      </div>
    </div>
  );
}

export default Forecast;
