import { render, waitFor, cleanup, fireEvent, act } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../../redux/configureStore";
import SearchCountryScreen from "../../screens/searchCountry/SearchCountryScreen";
import { setName, setCountries, setCapitalWeather } from "../../redux/reducer/country-slice";
import { Alert } from "react-native";

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

describe("Screen : Search Country", () => {
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
                <SearchCountryScreen navigation={navigation} />
            </Provider>
        ).toJSON()
        expect(tree).toMatchSnapshot();
    })
    it("Button should be disabled if no input entered", () => {
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <Provider store={store}>
                <SearchCountryScreen navigation={navigation} />
            </Provider>
        )
        const searchButton = getByTestId("Search-Country-Button");
        expect(searchButton.props.accessibilityState.disabled).toBeTruthy();
    })
    it("Button should be clickable as input enter", async () => {
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <Provider store={store}>
                <SearchCountryScreen navigation={navigation} />
            </Provider>
        )
        const inputText = "india";
        const searchButton = getByTestId("Search-Country-Button");
        expect(searchButton.props.accessibilityState.disabled).toBeTruthy();

        const nameInput = getByTestId("Name-Input");
        await waitFor(() => {
            fireEvent.changeText(nameInput, inputText)
        })
        const searchButtonAfterChange = getByTestId("Search-Country-Button");
        expect(searchButtonAfterChange.props.accessibilityState.disabled).toBeFalsy();
    })
    it("Input value should be change", async () => {
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <Provider store={store}>
                <SearchCountryScreen navigation={navigation} />
            </Provider>
        )
        const inputText = "india";
        const searchButton = getByTestId("Search-Country-Button");
        expect(searchButton.props.accessibilityState.disabled).toBeTruthy();
        const nameInput = getByTestId("Name-Input");
        await waitFor(() => {
            fireEvent.changeText(nameInput, inputText)
        })
        expect(store.getState().country.name).toBe(inputText)
    })
    it("Valid Countries should be find on valid name", async () => {
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <Provider store={store}>
                <SearchCountryScreen navigation={navigation} />
            </Provider>
        )
        await act(async () => {
            const inputText = "india";
            const nameInput = getByTestId("Name-Input");
            await waitFor(() => {
                fireEvent.changeText(nameInput, inputText)
            })
            const searchButton = getByTestId("Search-Country-Button");
            await fireEvent.press(searchButton)
            expect(store.getState().country.countries.length).toBe(2);
            expect(navigation.navigate).toHaveBeenCalledWith("CountryListScreen")
        })
    })
    it("Error should be show on invalid name", async () => {
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <Provider store={store}>
                <SearchCountryScreen navigation={navigation} />
            </Provider>
        )
        await act(async () => {
            const inputText = "AAAAA";
            const nameInput = getByTestId("Name-Input");
            await waitFor(() => {
                fireEvent.changeText(nameInput, inputText)
            })
            const searchButton = getByTestId("Search-Country-Button");
            await fireEvent.press(searchButton)
            expect(Alert.alert).toHaveBeenCalled();
            // @ts-ignore
            expect(spyAlert.mock.calls[0][0]).toBe("Country Not Found");
        })
    })
})