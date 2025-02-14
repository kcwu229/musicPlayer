import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@/screen/HomeScreen";
import ArtistInfo from "@/screen/ArtistInfo";
import AlbumInfo from "@/screen/AlbumInfo";
import ChartInfo from "@/screen/ChartInfo";
import getSize from "@/components/AdjustSizeByScreenSize";
import {SafeAreaView} from "react-native";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
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
                    fontSize: getSize(16, 22,35),// Adjust the font size as needed
                },
            }}
            initialParams={{ albumData: {} }}
        />
    </Stack.Navigator>

  );
};

export default HomeStackNavigator;
