import React, { useState } from "react";
import API from "../src/services/api";
import { Select } from "antd";

function App() {
  let timeout;
  const { Option } = Select;
  const [weatherData, setWeatherData] = useState();

  const getWeatherData = (data, callback) => {
    API.getWeatherData(data.lat, data.lon)
      .then((result) => {
        console.log(result);
        callback(result);
      })
      .catch((err) => {
        console.log("ERRORnya : ", err);
      });
  };

  const prepareGeoLocation = (city, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const fetchGeoLocation = () => {
      API.getGeoLocation(city)
        .then((result) => {
          console.log(result);
          const data = result.map((item, index) => ({
            id: index,
            city: item["name"],
            country: item["country"],
            state: item["state"],
            lon: item["lon"],
            lat: item["lat"],
          }));
          callback(data);
        })
        .catch((err) => {
          console.log("ERRORnya : ", err);
        });
    };
    timeout = setTimeout(fetchGeoLocation, 500);
  };

  const SearchInput = (props) => {
    const [geoLocationData, setGeoLocationData] = useState([]);
    const [geoLocationIndex, setGeoLocationIndex] = useState();

    const handleSearch = (newValue) => {
      if (newValue) {
        prepareGeoLocation(newValue, setGeoLocationData);
      } else {
        setGeoLocationData([]);
      }
    };

    const handleChange = (index) => {
      setGeoLocationIndex(index);
      getWeatherData(geoLocationData[index], setWeatherData);
      // console.log(geoLocationData[index]);
    };

    return (
      <Select
        showSearch
        value={geoLocationIndex}
        placeholder={props.placeholder}
        style={props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
      >
        {(geoLocationData || null).map((d) => (
          <Option key={d.id} value={d.id}>
            {d.city} - {d.state} - {d.country}
          </Option>
        ))}
      </Select>
    );
  };

  return (
    <div className="App">
      <SearchInput
        placeholder="Search City"
        style={{
          width: 800,
        }}
      />
      <div className="weatherInfo">
        {weatherData ? (
          <div className="weatherDetail">{weatherData.name}</div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
