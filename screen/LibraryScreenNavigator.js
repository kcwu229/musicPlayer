import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import getSize from "@/components/AdjustSizeByScreenSize";
import LoginScreen from "./LoginScreen";
import LibraryScreen from "./LibraryScreen";
import PlayListScreen from "@/screen/Library/PlayListScreen";
import ArtistListScreen from "@/screen/Library/ArtistListScreen";
import AlbumListScreen from "@/screen/Library/AlbumListScreen";
import TrackListScreen from "@/screen/Library/TrackListScreen";
import GenreListScreen from "@/screen/Library/GenreListScreen";
import SignUpScreen from "@/screen/SignUpScreen";

const Stack = createStackNavigator();

const LibraryScreenNavigator = () => {
  return (
          <Stack.Navigator initialRouteName="LibraryScreen">
              <Stack.Screen name="LibraryScreen" component={LibraryScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="PlayListScreen" component={PlayListScreen} />
              <Stack.Screen name="ArtistScreen" component={ArtistListScreen} />
              <Stack.Screen name="AlbumScreen" component={AlbumListScreen} />
              <Stack.Screen name="TrackScreen" component={TrackListScreen} />
              <Stack.Screen name="GenreScreen" component={GenreListScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
  );
};

export default LibraryScreenNavigator;
