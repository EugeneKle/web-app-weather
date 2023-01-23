import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "prague" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}`
        );
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div
      className="mx-auto max-w-screen-md mt-4 py-20 px-32 
    bg-gradient-to-r from-indigo-500 to-blue-500 h-fit shadow-xl
     shadow-gray-400
     rounded-3xl"
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setUnits={setUnits} setQuery={setQuery} units={units} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title={"hourly forecast"} items={weather.hourly} />
          <Forecast title={"daily forecast"} items={weather.daily} />
        </div>
      )}
      <ToastContainer autoClose={1000} theme="colored" newestOnTop />
    </div>
  );
}

export default App;
