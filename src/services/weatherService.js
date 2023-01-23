import { DateTime } from "luxon";

const API_KEY = "df3b7a25199723805e6491910abd9507";
const BASE_URL = "https://api.openweathermap.org/data";

const getWeatherData = (apiVersion, infoType, serachParams) => {
  const url = new URL(BASE_URL + "/" + apiVersion + "/" + infoType);
  url.search = new URLSearchParams({ ...serachParams, appid: API_KEY });

  return fetch(url).then((response) => response.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    speed,
    details,
    icon,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (serachParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "2.5",
    "weather",
    serachParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("3.0", "onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: serachParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time 'h:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
};

export default getFormattedWeatherData;
export { iconUrlFromCode, formatToLocalTime };
