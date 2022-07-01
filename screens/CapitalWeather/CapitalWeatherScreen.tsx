import { useSelector } from "react-redux"
import WeatherContainer from "./weather-container";

const CapitalWeatherScreen = () => {
    const country = useSelector(state => state.country);
    return (
        <WeatherContainer item={country.capitalWeather} index={0} />
    )
}

export default CapitalWeatherScreen;