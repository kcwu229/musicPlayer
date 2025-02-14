import React, { useState } from "react";
import {View, Text, StyleSheet, Dimensions, StatusBar, Platform} from "react-native";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SearchResultPage from "@/components/SearchScreen/SearchResultPage";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { ScrollView } from "react-native-gesture-handler";
import getSize from "../components/AdjustSizeByScreenSize";
const { height } = Dimensions.get("window");

const SearchScreen = () => {
  const {
    selectedTrack,
    setSelectedTrack,
    isMinimized,
    handleMinimizedScreen,
  } = useMusicPlayer();

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.search}>Search</Text>
        <SearchBar />
        <SearchResultPage setSelectedTrack={setSelectedTrack} />
      </ScrollView>

      <View style={{ flex: 1 }}>
        {selectedTrack && (
          <View
            style={
              isMinimized
                ? styles.minimizedScreenContainer
                : styles.fullScreenContainer
            }
          >
            <MusicPlayerScreen
              trackData={selectedTrack}
              isMinimized={isMinimized}
              handleMinimizedScreen={handleMinimizedScreen}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  minimizedScreen: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    padding: 0,
  },
  search: {
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight + 20 : 0,
    fontSize: getSize(32, 35, 50),
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  fullScreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: "100%",
  },
  minimizedScreenContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    zindex: 1,
    backgroundColor: "black",
  },
});

export default SearchScreen;
