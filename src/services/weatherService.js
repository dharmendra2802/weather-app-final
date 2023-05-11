import { DateTime } from "luxon";
import { useState } from "react";

const API_KEY = "d8ab493aa80cf34ae8123f2490d4887b";
const Base_URL = "https://api.openweathermap.org/data/2.5";
let latitude,longitude;

const getWeatherData = (infoType , searchPara) =>
{
    const url = new URL(Base_URL + "/" + infoType);
    
    url.search = new URLSearchParams({...searchPara,appid:API_KEY}
        );
   // console.log(url);
    return fetch(url).then((res) => res.json())
};

const formatCurrentWeather = (data) =>
{
    const {
        coord: {lon,lat},
        main:{uvi,temp, feels_like , temp_min , temp_max , humidity},
        name,
        dt,
        sys : {country , sunrise , sunset},
        weather,
        wind:{speed}
    } = data
    const {main:details , icon} = weather[0]

    return {lat,lon,temp,feels_like,temp_min,temp_max,uvi
    ,humidity,name,dt,country,sunrise,sunset,weather,speed,details,icon}
}

const formatForecastWeather = (data) => {
    let { timezone, daily , hourly } = data;
    daily = daily.slice(1,6).map(d => {
        return {
            title: formatLocalTime(d.dt,timezone,'ccc'),
            temp: d.temp.day,
            icon:d.weather[0].icon
        }
    });

    hourly = hourly.slice(1,6).map(d => {
        return {
            title: formatLocalTime(d.dt,timezone,'hh:mm a'),
            temp: d.temp,
            icon:d.weather[0].icon
        }
    });

    return { timezone , hourly , daily};
};

const formatLocalTime = (secs , zone , format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const getFormattedWeatherData = async (searchPara) => {
    const formattedCurrentWeather = await getWeatherData("weather",searchPara)
    .then(formatCurrentWeather)

    const {lat,lon} = formattedCurrentWeather;
    latitude=lat;
    longitude=lon;
    const formattedForecastWeather = await getWeatherData('onecall',{
        lat , lon, exclude: 'current,minutely,alerts',
        units: searchPara.units
    }).then(formatForecastWeather);

  return {...formattedCurrentWeather, ...formattedForecastWeather};

};

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;



export {formatLocalTime, iconUrlFromCode};
export default getFormattedWeatherData;
export {longitude,latitude,API_KEY} ;