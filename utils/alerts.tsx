import { Platform, Alert } from "react-native";


export const showAlert = (message: string) => {
    if (Platform.OS === "web") {
        alert(message)
    } else Alert.alert(message)
}