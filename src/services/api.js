import axios from "axios";

const API_KEY = "39b6860e6353cc7a2585c4589dc44086";
const BASE_URL = "https://api.openweathermap.org/";

const API_KEY_STRING = "&appid=" + API_KEY;

const Get = (PATH) => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}${PATH}${API_KEY_STRING}`).then(
      (result) => {
        // console.log(result);
        // console.log(result.data);
        resolve(result.data);
      },
      (err) => {
        reject(err);
        console.log(`Error Occur : ${err}`);
      }
    );
  });
  return promise;
};

// Weather Path
const getGeoLocation = (city) => Get(`geo/1.0/direct?q=${city}&limit=30`);
const getWeatherData = (lat, lon) =>
  Get(`data/2.5/weather?lat=${lat}&lon=${lon}`);

const API = {
  getGeoLocation,
  getWeatherData,
};

export default API;
