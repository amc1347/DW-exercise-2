import React from 'react';

import Header from "../components/Header";

const weatherkey = 'fb82e5ba417b0e788f1e585a9cb688cf';

function Home() {
    return (
        <>
        <Header /> 
        <main className="Home">
            <h2>Weather Data</h2>
        <div className = "WeatherInfo">
            <p>Weather Type: Cloudy</p>
            <p>Current Temperature: 100 degrees</p>
            <p>High Temperature: 100 degrees</p>
            <p>Low Temperature: 80 derees</p>
            <p>Coudiness: 100</p>
            <p>Humidity: 35%</p>
            <p>Wind Speed: 3km/h</p>
        </div>
        </main>
        </>
    );
}

export default Home;