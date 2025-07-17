import { searchCity, getWeather } from "../services/api";
import { useState } from "react";
import search_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import '../css/Home.css'

function Home() {
    const [searchQuery, setsearchQuery] = useState("")
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    //Error Message Component
    const ErrorMsg = () =>
    (
       
        <div className="error-msg">
            <p>⚠️Cannot be found</p>
        </div>
    )
         
    //Processing the Input
    const handleSearch = async (e) =>
    {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try
        {
            const searchResults = await searchCity(searchQuery)

            const matchedCity = searchResults.find(city=>city.name.toLowerCase() === searchQuery.toLowerCase())

            if (!matchedCity)
            {
                setError(<ErrorMsg></ErrorMsg>)
                setWeather(null)
            }
            else
            {
                const cityName = searchResults[0].name
                const weatherData = await getWeather(cityName)
                setWeather(weatherData)
                setError(null)
            }

        }
        catch(err)
        {
            console.log (err)
            setError("NOT WORKING")
            setWeather(null);
        }
        finally
        {
            setLoading(false)
        }
    }

    //Formatting the page 
    return (
        <div className="weather">
            <form className="search-bar" onSubmit={handleSearch}>
                <input 
                type="text" 
                placeholder="Search" 
                className="search-bar"
                value={searchQuery} 
                onChange={(e) => setsearchQuery(e.target.value)}></input>


                <button type="submit" className="search-button">
                <img src={search_icon} alt="search" onClick={handleSearch}></img>
                </button>
            </form>
                        


            <div className="details">

                {error && !loading && <ErrorMsg></ErrorMsg>}

                {loading? (<div className="loading">⌛Loading...</div>): weather? (
                <>
                <div className="icon-center">
                <img src={`https:${weather.current.condition.icon}`} alt="weather-icon" className="icon"></img>
                </div>
                <p className="temperature">{Math.floor(weather.current.temp_c)}°C</p>
                <p className="location">{weather.location.name}</p>

                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="humidity-icon"></img>
                        <div>
                            <p>{weather.current.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>

                    <div className="col">
                        <img src={wind_icon} alt="humidity-icon"></img>
                        <div>
                            <p>{weather.current.wind_kph} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
                </>):(!error && !searchQuery && <div className="loading">🏙️ Please find your city</div>)}
            </div>
        </div>
    )
}

export default Home