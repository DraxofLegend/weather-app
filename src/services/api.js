const API_KEY = "8f721d6fa2564069b0a34210251107"
const BASE_URL = "http://api.weatherapi.com/v1"

export const getWeather = async (city) =>
{
    const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`);
    const data = await response.json()
    return data
}

export const searchCity = async (query) => 
{
    const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data
}