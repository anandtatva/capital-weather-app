import { CountryType } from "../types/country-type";
import { CapitalWeatherType } from "../types/capital-weather-type";

type SuccessResponse = {
    status: true;
    data: any;
}
type FailResponse = {
    status: false;
    message: string;
}


const searchCountryAPIs = async (name: string): Promise<SuccessResponse | FailResponse> => {
    const URL = "https://restcountries.com/v2/name/" + name;

    try {
        let resp = await fetch(URL);
        resp = await resp.json();
        const data: CountryType[] = resp?.map(({ capital, latlng, flag, population }: any) => ({ capital, latlng, flag, population }))
        return {
            status: true,
            data
        }

    } catch (error) {
        return {
            status: false,
            message: "Country Not Found",
        }
    }
}
const capitalWeatherAPIs = async (name: string): Promise<SuccessResponse | FailResponse> => {
    const URL = "http://api.weatherstack.com/current?access_key=f580fcdaef6370f93b9a17a98ebeb0ce&query=" + name;

    try {
        let resp = await fetch(URL);
        resp = await resp.json();
        const { temperature, weather_icons, wind_speed, precip } = resp.current;
        const data: CapitalWeatherType = { temperature, weather_icons, wind_speed, precip }
        return {
            status: true,
            data
        }

    } catch (error) {
        return {
            status: false,
            message: "something went wrong",
        }
    }
}
export {
    searchCountryAPIs,
    capitalWeatherAPIs
}
