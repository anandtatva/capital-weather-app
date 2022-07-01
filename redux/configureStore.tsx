import { createStore, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CountrySlice from "./reducer/country-slice"
const persistConfig = {
    key: "country",
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    country: CountrySlice
})

const persistReducers = persistReducer(persistConfig, rootReducer)

const store = createStore(persistReducers);

const persistor = persistStore(store)

export {
    store,
    persistor
}