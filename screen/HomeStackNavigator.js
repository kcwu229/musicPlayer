import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@/screen/HomeScreen";
import { Dimensions } from "react-native";
import ArtistInfo from "@/screen/ArtistInfo";
import AlbumInfo from "@/screen/AlbumInfo";
import ChartInfo from "@/screen/ChartInfo";

const { height } = Dimensions.get("window");

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
            height: 120, // Adjust the height value as needed
          },
          headerTitleStyle: {
            fontSize: height > 800 ? 35 : 24, // Adjust the font size as needed
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
            height: 120,
            // Adjust the height value as needed
          },
          headerTitleStyle: {
            fontSize: height > 800 ? 35 : 24, // Adjust the font size as needed
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
                    height: 120,
                    // Adjust the height value as needed
                },
                headerTitleStyle: {
                    fontSize: height > 800 ? 35 : 24, // Adjust the font size as needed
                },
            }}
            initialParams={{ albumData: {} }}
        />
    </Stack.Navigator>

  );
};

export default HomeStackNavigator;
