import { createSlice } from "@reduxjs/toolkit";
import { CountryType } from "../../types/country-type"
import { CapitalWeatherType } from "../../types/capital-weather-type"


interface CountryState {
    name: string;
    countries: CountryType[];
    capitalWeather: CapitalWeatherType | null;
}

const initialState: CountryState = {
    name: "",
    capitalWeather: null,
    countries: []
}

const CountrySlice = createSlice({
    name: "country-slice",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setCountries: (state, action) => {
            state.countries = action.payload
        },
        setCapitalWeather: (state, action) => {
            state.capitalWeather = action.payload
        },

    }
})


export const { setCapitalWeather, setCountries, setName } = CountrySlice.actions;
export default CountrySlice.reducer;