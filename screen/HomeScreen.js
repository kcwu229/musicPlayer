import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import TopBanner from "@/components/HomeScreen/TopBanner";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SuggestionSection from "@/components/HomeScreen/SuggectionSection";
import ChartSection from "@/components/HomeScreen/ChartSection";
import TrendingAlbumSection from "@/components/HomeScreen/TrendingAlbumSection";
import PopularArtistSection from "@/components/HomeScreen/PopularArtistSection";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";

const name = "Sam";

const HomeScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  console.log(selectedAlbum);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {selectedAlbum && (
        <View
          style={
            isMinimized === false ? styles.fullScreen : styles.minimizedScreen
          }
        >
          <MusicPlayerScreen albumData={selectedAlbum} />
        </View>
      )}
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
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "ultralight",
    color: "darkgrey",
  },
  name: { fontSize: 30, fontWeight: "normal" },
  container: {
    flex: 1,
    padding: 20,
  },
  main: {
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,

    padding: 0,
    zIndex: 1,
  },
  minimizedScreen: {
    position: "absolute",
    left: 0,
    right: 0,

    padding: 0,
    zIndex: 1,
  },
});

export default HomeScreen;
