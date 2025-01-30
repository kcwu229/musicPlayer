import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@/Screen/HomeScreen";
import ArtistInfo from "@/Screen/ArtistInfo";

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
        }}
        initialParams={{ artistData: {} }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
