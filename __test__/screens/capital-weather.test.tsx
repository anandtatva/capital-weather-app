import { render, waitFor, cleanup, fireEvent, act } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../../redux/configureStore";
import CapitalWeatherScreen from "../../screens/CapitalWeather/CapitalWeatherScreen";
import { setName, setCountries, setCapitalWeather } from "../../redux/reducer/country-slice";
import { Alert } from "react-native";
import { mockContries } from "../../screens/CountryList/mock-countries";
import { mockCapitalWeather } from "../../screens/CapitalWeather/mockCapitalWeather";

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native")
    return {
        ...actualNav,
        useFocusEffect: () => jest.fn(),
        useNavigation: () => ({
            navigate: jest.fn()
        }),
        useRoute: () => ({
            params: {}
        })
    }
})

describe("Screen: Capital Weather", () => {
    beforeEach(() => {
        fetchMock.mockIf(/^https?:\/\/example.com.*S/)
        store.dispatch(setName(""));
        store.dispatch(setCountries([]))
        store.dispatch(setCapitalWeather(null))
    })
    afterEach(() => {
        jest.clearAllMocks();
        cleanup()
    })
    it("renders correctly", () => {
        store.dispatch(setCapitalWeather(mockCapitalWeather))
        const tree = render(
            <Provider store={store}>
                <CapitalWeatherScreen />
            </Provider>
        ).toJSON()
        expect(tree).toMatchSnapshot();
    })
    it("Countries should be render correctly", () => {
        store.dispatch(setCapitalWeather(mockCapitalWeather))
        const tree = render(
            <Provider store={store}>
                <CapitalWeatherScreen />
            </Provider>
        ).toJSON()
        expect(tree).toMatchSnapshot();
    })

    it("Valid weather container details should be  show in capital weather container", () => {
        store.dispatch(setCapitalWeather(mockCapitalWeather))
        const { getByTestId } = render(
            <Provider store={store}>
                <CapitalWeatherScreen />
            </Provider>
        );
        const temperature = getByTestId("Temperature-0");
        const precip = getByTestId("Precip-0");
        const windSpeed = getByTestId("Wind-Speed-0");
        expect(temperature.children[1]).toBe(String(mockCapitalWeather.temperature))
        expect(precip.children[1]).toBe(String(mockCapitalWeather.precip))
        expect(windSpeed.children[1]).toBe(String(mockCapitalWeather.wind_speed))
    })
})