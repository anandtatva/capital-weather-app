import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SearchCountryScreen from '../screens/searchCountry/SearchCountryScreen';
import CountryListScreen from '../screens/CountryList/CountryListScreen';
import CapitalWeatherScreen from '../screens/CapitalWeather/CapitalWeatherScreen';

export default function Navigation() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SeachCounryScreen" component={SearchCountryScreen} options={{ title: "Search Country" }} />
      <Stack.Screen name="CountryListScreen" component={CountryListScreen} options={{ title: "Country list" }} />
      <Stack.Screen name="CapitalWeatherScreen" component={CapitalWeatherScreen} options={{ title: "Capital Weather" }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}