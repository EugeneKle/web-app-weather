import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function Inputs({ setQuery, units, setUnits }) {
  const [inputValue, setInputValue] = useState("");

  const handleClickOnUnits = (event) => {
    const selectedUnit = event.currentTarget.name;
    if (selectedUnit !== units) setUnits(selectedUnit);
  };

  const handleInputOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClickOnSearch = () => {
    if (inputValue === "") return;
    setQuery({ q: inputValue });
    setInputValue("");
  };

  const handleClickOnLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleClickOnSearch();
  };
  return (
    <div className="flex flex-row justify-center my-6 max-sm:my-2">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <form onSubmit={handleOnSubmit}>
          <input
            onChange={handleInputOnChange}
            value={inputValue}
            type="text"
            placeholder="Enter a city...."
            className="text-base font-light py-2 px-5 w-full shadow-xl 
            focus:outline-none  placeholder:text-white
            text-white 
            bg-gradient-to-l from-indigo-500 to-blue-500"
          />
        </form>
        <UilSearch
          onClick={handleClickOnSearch}
          size={20}
          className="cursor-pointer text-white transition ease-out hover:scale-125"
        />
        <UilLocationPoint
          onClick={handleClickOnLocation}
          size={20}
          className="cursor-pointer text-white transition ease-out hover:scale-125"
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center ">
        <button
          onClick={handleClickOnUnits}
          name="metric"
          className="text-xl text-white font-light 
          transition ease-out
          hover:scale-125"
        >
          °C
        </button>
        <p className="text-white mx-1">|</p>
        <button
          onClick={handleClickOnUnits}
          name="imperial"
          className="text-xl text-white font-light
          transition ease-out
          hover:scale-125"
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
