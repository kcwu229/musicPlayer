import React, { useState, useRef } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import TopBanner from "@/components/HomeScreen/TopBanner";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SuggestionSection from "@/components/HomeScreen/SuggectionSection";
import ChartSection from "@/components/HomeScreen/ChartSection";
import TrendingAlbumSection from "@/components/HomeScreen/TrendingAlbumSection";
import PopularArtistSection from "@/components/HomeScreen/PopularArtistSection";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import { MinimizedMusicPlayerHeader } from "@/components/MusicPlayerPage/MusicPlayerHeader";

const name = "Sam";

const HomeScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [initialPlayMusic, setInitialPlayMusic] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimizedScreen = () => {
    if (initialPlayMusic === false) {
      setInitialPlayMusic(true);
    }
    setIsMinimized((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.container}>
          <TopBanner />
          <Text style={styles.text}>Good morning,</Text>
          <Text style={styles.name}>{name}</Text>
          <SearchBar />
          <SuggestionSection setSelectedAlbum={setSelectedAlbum} />
          <ChartSection />
          <TrendingAlbumSection setSelectedAlbum={setSelectedAlbum} />
          <PopularArtistSection />
        </View>
      </ScrollView>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  minimizedScreenContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    width: "100%",
    flex: 1,
    backgroundColor: "black",
  },
  safeArea: {
    flex: 1,
    position: "relative",
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "ultralight",
    color: "darkgrey",
  },
  name: { fontSize: 30, fontWeight: "normal" },
  container: {
    flex: 1,
    position: "relative",
    padding: 10,
  },
  main: {
    justifyContent: "center",
    marginHorizontal: "auto",
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
});

export default HomeScreen;
