import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtistInfo from "@/screen/ArtistInfo";
import AlbumInfo from "@/screen/AlbumInfo";
import getSize from "@/components/AdjustSizeByScreenSize";
import LoginScreen from "@/screen/LoginScreen";
import SignUpScreen from "@/screen/SignUpScreen";
import SearchScreen from "@/screen/SearchScreen";

const Stack = createStackNavigator();

const SearchScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArtistInfo"
        component={ArtistInfo}
        options={{
          headerShown: true,
          headerStyle: {
            height: getSize(40, 100, 120), // Adjust the height value as needed
          },
          headerTitleStyle: {
            fontSize: getSize(24, 28,35), // Adjust the font size as needed
          },
        }}
        initialParams={{ artistData: {} }}
      />
      <Stack.Screen
        name="AlbumInfo"
        component={AlbumInfo}
        options={{
          headerShown: true,
          headerStyle: {
            height: getSize(40, 100, 120),
            // Adjust the height value as needed
          },
          headerTitleStyle: {
            fontSize: getSize(16, 22,35),// Adjust the font size as needed
          },
        }}
        initialParams={{ albumData: {} }}
      />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default SearchScreenNavigator;
