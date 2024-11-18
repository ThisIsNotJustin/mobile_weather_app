import { CallProps, WeatherData } from './types';

let current: WeatherData;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export async function fetchWeather(args: CallProps) {
    let URL;

    if (args.city != null) {
        URL = BASE_URL +
            'q=' +
            args.city +
            ',' +
            args.country +
            '&appid=' +
            args.key +
            '&units=' +
            args.unit +
            '&lang=' +
            args.lang;
    } else if (args.zip_code != null) {
        URL = BASE_URL +
            'zip=' +
            args.zip_code +
            ',' +
            args.country +
            '&appid=' +
            args.key +
            '&units=' +
            args.unit +
            '&lang=' +
            args.lang;
    } else {
        URL = BASE_URL +
            'lat=' +
            args.lat +
            '&lon=' +
            args.lon +
            '&appid=' +
            args.key +
            '&units=' +
            args.unit +
            '&lang=' +
            args.lang;
    }

    const response = await fetch(URL);
    const data = await response.json();
    current = data;
    return data;
}

export async function fiveDaysForecast(args: CallProps) {
    let result;
    const URL = BASE_URL +
            'lat=' +
            args.lat +
            '&lon=' +
            args.lon +
            '&appid=' +
            args.key +
            '&units=' +
            args.unit +
            '&lang=' +
            args.lang;
  
    await fetch(URL)
        .then(res => res.json())
        .then(data => {
            result = data;
        });
  
    return result;
}

export function showWeather(this: WeatherData, weatherData: any) {
    if (!weatherData) {
        throw new Error("No weather data available");
    }

    this.name = weatherData.name;
    this.sys = {country: weatherData.sys.country};
    this.main = {
        temp: weatherData.main.temp,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        feels_like: weatherData.main.feels_like,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity
    };
    this.wind = {speed: weatherData.wind.speed};
    this.weather = [{
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon
    }];
    this.icon =
    'https://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png';
}