import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faCloud, 
    faCloudRain,
    faSun,
    faSmog,
    faWind,
} from "@fortawesome/free-solid-svg-icons";

function WeatherImage({weatherType}) {
    switch (weatherType) {
        case "clear sky":
            return <FontAwesomeIcon icon={faSun} />;
        case "light rain"  || "moderate rain":
            return <FontAwesomeIcon icon={faCloudRain} />;
        case "overcast clouds":
            return <FontAwesomeIcon icon={faSmog} />;
        case "few clouds" || "scattered clouds" || "broken clouds" :
            return <FontAwesomeIcon icon={faCloud} />;
 
    
        default:
            return <FontAwesomeIcon icon={faWind} />;
    }
}


export default WeatherImage;