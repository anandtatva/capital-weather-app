import { render, waitFor, cleanup, fireEvent, act } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../../redux/configureStore";
import CountryListScreen from "../../screens/CountryList/CountryListScreen";
import { setName, setCountries, setCapitalWeather } from "../../redux/reducer/country-slice";
import { Alert } from "react-native";
import { mockContries } from "../../screens/CountryList/mock-countries";

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

const spyAlert = jest.spyOn(Alert, "alert")

describe("Screen : Country List", () => {
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
        const navigation = { navigate: jest.fn() }
        const tree = render(
            <Provider store={store}>
                <CountryListScreen navigation={navigation} />
            </Provider>
        ).toJSON()
        expect(tree).toMatchSnapshot();
    })
    it("Countries should be render correctly", () => {
        const navigation = { navigate: jest.fn() }
        store.dispatch(setCountries(mockContries))
        const tree = render(
            <Provider store={store}>
                <CountryListScreen navigation={navigation} />
            </Provider>
        ).toJSON()
        expect(tree).toMatchSnapshot();
    })

    it("Valid country details should be  render in country container", () => {
        const navigation = { navigate: jest.fn() }
        store.dispatch(setCountries(mockContries))
        const { getByTestId } = render(
            <Provider store={store}>
                <CountryListScreen navigation={navigation} />
            </Provider>
        );
        const capital = getByTestId("Capital-0");
        const population = getByTestId("Population-0");
        const latLng = getByTestId("LatLng-0");
        expect(capital.children[1]).toBe(mockContries[0].capital)
        expect(population.children[1]).toBe(String(mockContries[0].population))
        expect(latLng.children[1]).toBe(mockContries[0].latlng.join(","))
    })
    it("Capital weather should be show on press capital weather button", async () => {
        const navigation = { navigate: jest.fn() }
        store.dispatch(setCountries(mockContries))
        const { getByTestId } = render(
            <Provider store={store}>
                <CountryListScreen navigation={navigation} />
            </Provider>
        );
        await act(async () => {
            const capitalWeatherButton0 = getByTestId("Captal-Weather-Button-0");
            await fireEvent.press(capitalWeatherButton0)
            expect(navigation.navigate).toHaveBeenCalledWith("CapitalWeatherScreen")
            expect(Boolean(store.getState().country.capitalWeather)).toBeTruthy();
        })

    })
})