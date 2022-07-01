import { TouchableOpacity, Text, StyleSheet, ViewStyle, TouchableOpacityProps, TextStyle } from "react-native";
import { colors } from "../utils";


interface ButtonProps extends TouchableOpacityProps {
    onButtonPress: () => void;
    name: string;
    rootStyle?: ViewStyle;
    testId?: string;
    btnTextStyle?: TextStyle
}

function Button(props: ButtonProps) {
    const { name, btnTextStyle = {}, onButtonPress, testId, rootStyle = {}, disabled } = props;
    return (
        <TouchableOpacity
            testID={testId}
            onPress={onButtonPress}
            style={[styles.container, rootStyle, disabled && styles.disabled]}
            disabled={disabled}
        >
            <Text style={[styles.name, btnTextStyle]}>{name}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        marginVertical: 20
    },
    name: {
        color: colors.secondary,
        textAlign: "center"
    },
    disabled: {
        opacity: 0.8
    }
})
export { ButtonProps }

export default Button;