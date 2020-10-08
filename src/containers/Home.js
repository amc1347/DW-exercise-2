import React, { useState, useEffect, useMemo}  from 'react';
import axios from 'axios';

import Header from "../components/Header";

const weatherKey = 'fb82e5ba417b0e788f1e585a9cb688cf';

function Home() {
    // const [backgroundColor, setBackgroundColor] = useState(null);
    // const [city, setCity] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("Tokyo");

    // let city = "chicago";

    const [updated, setUpdated] = useState(0);
    let updatedCount = 0;

    useEffect(() => {
        setUpdated(updated + 1);
        setCity("Tokyo");
    }, []);

    console.log("updated", updated);

    console.log("updatedCount", updatedCount);
    
    useEffect(() => {
        // setCity("Seoul");
        // setBackgroundColor("#e5e5e5");
        axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`
        )
        .then(function (response) {
            const weather = response.data;
            setWeatherData(weather);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
    } , []);

    const {
        cloudiness,  
        currentTemp,
        highTemp,
        humidity,
        lowTemp,
        weatherType,
        windSpeed,
         } = useMemo(() => {
            let cloudiness = "";
            let currentTemp = "";
            let highTemp = "";
            let humidity = "";
            let lowTemp = "";
            let weatherType = "";
            let windSpeed = "";

            if (weatherData) {
                cloudiness = `${weatherData.clouds.all}%`;
                currentTemp = `${weatherData.main.temp}`;
                highTemp = `${weatherData.main.temp_max}`;
                humidity = `${weatherData.main.humidity}%`;
                lowTemp = `${weatherData.main.temp_min}`;
                weatherType = `${weatherData.weather[0].description}`;
                windSpeed = `${weatherData.wind.speed} km/h`;
            }
        

        return { 
            cloudiness,
            currentTemp,
            highTemp,
            humidity,
            lowTemp,
            weatherType,
            windSpeed
        
        };
    }, [weatherData]);

    
    console.log("weatherData", weatherData);

    return (
        <>
        <Header/> 
        <main className="Home">
        {/* <main className="Home" style={{ backgroundColor }}> */}

            {/* <h2>Weather in {city}</h2> */}
            <h2>Weather in {city}</h2>
            {/* <h2 onCLick={() => setUpdated(updated + 1)}>Weather in {city}</h2> */}
            {/* <h3>Updated: { updated }</h3> */}
            <div className = "WeatherInfo">
                <p>Weather Type: {weatherType}</p>
                <p>Current Temperature: {currentTemp}</p>
                <p>High Temperature: {highTemp}</p>
                <p>Low Temperature: {lowTemp}</p>
                <p>Coudiness: {cloudiness}</p>
                <p>Humidity: {humidity}</p>
                <p>Wind Speed: {windSpeed}</p>
            </div>
        </main>
        </>
    );
}

export default Home;