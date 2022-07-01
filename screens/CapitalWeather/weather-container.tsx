import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "../../utils";
import { CapitalWeatherType } from "../../types/capital-weather-type";

interface WeatherContainerProps {
    index: number;
    item: CapitalWeatherType;
}
const WeatherContainer = ({ index, item }: WeatherContainerProps) => {

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, padding: 5 }}>
                <Image style={styles.image} source={{ uri: item.weather_icons[0] }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text} testID={`Temperature-${index}`}>Temperature: {item.temperature}</Text>
                <Text style={styles.text} testID={`Precip-${index}`}>Precip: {item.precip} </Text>
                <Text style={styles.text} testID={`Wind-Speed-${index}`}>Wind Speed: {item.wind_speed}</Text>
            </View>
        </View>
    )
}

export default WeatherContainer;

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