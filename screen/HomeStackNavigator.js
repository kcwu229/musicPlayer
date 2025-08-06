import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@/screen/HomeScreen";
import ArtistInfo from "@/screen/ArtistInfo";
import AlbumInfo from "@/screen/AlbumInfo";
import Results from "@/screen/Results";
import ChartInfo from "@/screen/ChartInfo";
import getSize from "@/components/AdjustSizeByScreenSize";
import LoginScreen from "@/screen/LoginScreen";
import SignUpScreen from "@/screen/SignUpScreen";
import LibraryScreen from "@/screen/LibraryScreen";
import SearchScreen from "@/screen/SearchScreen";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home ">
      <Stack.Screen
        name="Home "
        component={HomeScreen}
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
            fontSize: getSize(24, 28, 35), // Adjust the font size as needed
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
            fontSize: getSize(16, 22, 35), // Adjust the font size as needed
          },
        }}
        initialParams={{ albumData: {} }}
      />
      <Stack.Screen
        name="ChartInfo"
        component={ChartInfo}
        options={{
          headerShown: true,
          headerStyle: {
            height: getSize(40, 100, 120),
            // Adjust the height value as needed
          },
          headerTitleStyle: {
            fontSize: getSize(16, 22, 35), // Adjust the font size as needed
          },
        }}
        initialParams={{ albumData: {} }}
      />
      <Stack.Screen
        name="Results"
        component={Results}
        options={{
          headerShown: true,
          headerStyle: {
            height: getSize(40, 100, 120),
            // Adjust the height value as needed
          },
          headerTitleStyle: {
            fontSize: getSize(16, 22, 35), // Adjust the font size as needed
          },
        }}
        initialParams={{ albumData: {} }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
