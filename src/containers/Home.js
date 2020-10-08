import React, { useState, useEffect, useMemo}  from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Header from "../components/Header";
import WeatherImage from '../components/WeatherImage';

const weatherKey = 'fb82e5ba417b0e788f1e585a9cb688cf';

function Home() {
    const history = useHistory();

    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("Toronto");

    
    useEffect(() => {
        axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherKey}`
        )
        .then(function (response) {
            const weather = response.data;
            setWeatherData(weather);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
    } , [city]);

    useEffect(() => {
        const searchParams = history.location.search;
        const urlParams = new URLSearchParams(searchParams);
        const city = urlParams.get("city");
        if (city) {
            setCity(city)
        }
    }, [history]);

    const {
        cloudiness,  
        cloudinessValue,
        currentTemp,
        highTemp,
        humidity,
        lowTemp,
        weatherType,
        windSpeed,
         } = useMemo(() => {
            let cloudiness = "";
            let cloudinessValue = "";
            let currentTemp = "";
            let highTemp = "";
            let humidity = "";
            let lowTemp = "";
            let weatherType = "";
            let windSpeed = "";

            if (weatherData) {

                cloudiness = `${weatherData.clouds.all}%`;
                cloudinessValue = weatherData.clouds.all;
                currentTemp = `${Math.round(weatherData.main.temp)}°F`;
                highTemp = `${Math.round(weatherData.main.temp_max)}°F`;
                humidity = `${weatherData.main.humidity}%`;
                lowTemp = `${Math.round(weatherData.main.temp_min)}°F`;
                weatherType = `${weatherData.weather[0].description}`;
                windSpeed = `${weatherData.wind.speed} km/h`;
            }

        return { 
            cloudiness,
            cloudinessValue,
            currentTemp,
            highTemp,
            humidity,
            lowTemp,
            weatherType,
            windSpeed,
        };
    }, [weatherData]);

    
    console.log("weatherData", weatherData);

    return (
        <>
        <Header/> 
        <main className="Home" >
            <h2>Weather in <span>{city}</span></h2>
            <div className = "WeatherInfo">
                <div className = "WeatherInfo_Basic" style={{backgroundColor: `rgba(0,0,0,${cloudinessValue / 250})`}}>
                    <div className = "WeatherInfo_Image">
                        <WeatherImage weatherType={weatherType}/>
                    </div>
                <p className = "WeatherInfo_Type">{weatherType}</p>
                <h3 className="Label">Current Temperature:</h3>
                <p className = "WeatherInfo_Temperature">{currentTemp}</p>

                </div>
                <div className = "WeatherInfo_Extra">
                    <div className = "WeatherInfo_Extra_Column">
                        <h3 className = "Label">High Temperature: </h3>
                        <p className = "WeatherInfo_Temperature_Small">{highTemp}</p>
                        <h3 className = "Label">Low Temperature: </h3>
                        <p className = "WeatherInfo_Temperature_Small">{lowTemp}</p>
                    </div>
                    <div className = "WeatherInfo_Extra_Column">
                        <h3 className = "Label">Coudiness: </h3>
                        <p className = "WeatherInfo_Temperature_Small">{cloudiness}</p>
                        <h3 className = "Label">Humidity: </h3>
                        <p className = "WeatherInfo_Temperature_Small">{humidity}</p>
                        <h3 className = "Label">Wind Speed: </h3>
                        <p className = "WeatherInfo_Temperature_Small">{windSpeed}</p>
                    </div>
                    
                    
                </div>
            </div>
        </main>
        </>
    );
}

export default Home;