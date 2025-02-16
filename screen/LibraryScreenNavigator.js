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
import HomeScreen from "@/screen/HomeScreen";
import ArtistInfo from "@/screen/ArtistInfo";
import AlbumInfo from "@/screen/AlbumInfo";

const Stack = createStackNavigator();

const LibraryScreenNavigator = () => {
  return (
          <Stack.Navigator initialRouteName="Library">
              <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Playlists" component={PlayListScreen} />
              <Stack.Screen name="Artists" component={ArtistListScreen} />
              <Stack.Screen name="Albums" component={AlbumListScreen} />
              <Stack.Screen name="Tracks" component={TrackListScreen} />
              <Stack.Screen name="Genres" component={GenreListScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
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
          </Stack.Navigator>
  );
};

export default LibraryScreenNavigator;
