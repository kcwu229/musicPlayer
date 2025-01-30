import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SearchResultPage from "@/components/SearchScreen/SearchResultPage";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { ScrollView } from "react-native-gesture-handler";

const SearchScreen = () => {
  const {
    selectedAlbum,
    setSelectedAlbum,
    isMinimized,
    handleMinimizedScreen,
  } = useMusicPlayer();

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.search}>Search</Text>
        <SearchBar />
        <SearchResultPage setSelectedAlbum={setSelectedAlbum} />
      </ScrollView>

      <View style={{ flex: 1 }}>
        {selectedAlbum && (
          <View
            style={
              isMinimized
                ? styles.minimizedScreenContainer
                : styles.fullScreenContainer
            }
          >
            <MusicPlayerScreen
              albumData={selectedAlbum}
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
    fontSize: 32,
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
