import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import { CountryType } from "../../types/country-type";
import CountryContainer from "./country-container";
import { colors, showAlert } from "../../utils";
import { capitalWeatherAPIs } from "../../services/api";
import { setCapitalWeather } from "../../redux/reducer/country-slice";

const CountryListScreen = ({ navigation }) => {
    const country = useSelector(state => state.country);
    const dispatch = useDispatch();

    const handleCapitalWeather = async (item: CountryType) => {
        const resp = await capitalWeatherAPIs(item.capital);
        if (resp.status) {
            dispatch(setCapitalWeather(resp.data))
            navigation.navigate("CapitalWeatherScreen")
        } else showAlert(resp.message)
    }
    const renderItem = ({ index, item }: { item: CountryType; index: number; }) => (
        <CountryContainer index={index} item={item} onPress={handleCapitalWeather} />
    )
    return (
        <View>
            <FlatList
                data={country?.countries || []}
                renderItem={renderItem}
                keyExtractor={(_, index) => String(index)}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    )
}

export default CountryListScreen;

const styles = StyleSheet.create({
    container: {

    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary
    }
})