import React, { useState, useEffect } from "react";
import API from "../src/services/api";

function App(props) {
  useEffect(() => {
    // getGeoLocation();
    getWeatherData();
    //console.log("TES TES");
  }, [props]);

  const getGeoLocation = () => {
    API.getGeoLocation("Rembang")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("ERRORnya : ", err);
      });
  };

  const getWeatherData = () => {
    API.getWeatherData("-6.7056856", "111.3486234")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("ERRORnya : ", err);
      });
  };

  return (
    <div className="App">
      <div>EMPTY PROJECT</div>
    </div>
  );
}

export default App;
