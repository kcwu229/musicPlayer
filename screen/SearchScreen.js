import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SearchResultPage from "@/components/SearchScreen/SearchResultPage";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
const SearchScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <View style={styles.container}>
      {selectedAlbum && (
        <View
          style={
            isMinimized === false ? styles.fullScreen : styles.minimizedScreen
          }
        >
          <MusicPlayerScreen albumData={selectedAlbum} />
        </View>
      )}
      <Text style={styles.search}>Search</Text>
      <SearchBar />
      <SearchResultPage setSelectedAlbum={setSelectedAlbum} />
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
    padding: 24,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    zIndex: 1,
  },
});

export default SearchScreen;
