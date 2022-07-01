import { View, Text, TextInput, StyleSheet } from "react-native";
import { strings, colors, showAlert } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { setName, setCountries } from "../../redux/reducer/country-slice";
import Button from "../../components/Button";
import { searchCountryAPIs } from "../../services/api";

const SearchCountryScreen = ({ navigation }) => {
    const country = useSelector(state => state.country);
    const dispatch = useDispatch();

    const handleChange = (text: string) => {
        dispatch(setName(text));
    }
    const handleSearch = async () => {
        const resp = await searchCountryAPIs(country.name)
        if (resp.status) {
            dispatch(setCountries(resp.data));
            navigation.navigate("CountryListScreen")
        } else showAlert(resp.message)
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                testID="Name-Input"
                placeholder={strings.countryPlaceholder}
                placeholderTextColor={colors.gray}
                value={country.name}
                onChangeText={handleChange}
            />
            <Button
                disabled={!country.name}
                name="Search Country"
                onButtonPress={handleSearch}
                testId={"Search-Country-Button"}
            />
        </View>
    )
}

export default SearchCountryScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 2
    }
})