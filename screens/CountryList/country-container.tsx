import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import { CountryType } from "../../types/country-type";
import Button from "../../components/Button";
import { colors } from "../../utils";

interface CountryContainerProps {
    index: number;
    item: CountryType;
    onPress: (item: CountryType) => void;
}
const CountryContainer = ({ index, item, onPress }: CountryContainerProps) => {
    const handleWeather = async () => {
        await onPress(item)
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, padding: 5 }}>
                <Image style={styles.image} source={{ uri: item.flag }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text} testID={`Capital-${index}`}>Capital: {item.capital}</Text>
                <Text style={styles.text} testID={`Population-${index}`}>Population: {item.population} </Text>
                <Text style={styles.text} testID={`LatLng-${index}`}>LatLng: {item.latlng.join(",")}</Text>
                <Button
                    rootStyle={styles.button}
                    btnTextStyle={styles.btnText}
                    onButtonPress={handleWeather}
                    name={"Captal Weather"}
                    testId={`Captal-Weather-Button-${index}`}
                />
            </View>
        </View>
    )
}

export default CountryContainer;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        marginVertical: 5
    },
    btnText: {
        color: colors.primary
    },
    container: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: colors.primary
    },
    image: {
        width: 25,
        height: 25,
        borderRadius: 50
    },
    text: {
        color: colors.secondary,
        lineHeight: 20
    },
    textContainer: {
        flex: 4

    }
})