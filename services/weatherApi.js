const API_KEY = '554297ff18589f54e8fb0920d28684c1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall';

export const fetchWeather = async (lat, lon) => {
    try {
        const response = await fetch(
            `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch data from the server');
        };

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};