import React, { useState, useRef } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import TopBanner from "@/components/HomeScreen/TopBanner";
import SearchBar from "@/components/HomeScreen/SearchBar";
import SuggestionSection from "@/components/HomeScreen/SuggectionSection";
import ChartSection from "@/components/HomeScreen/ChartSection";
import TrendingAlbumSection from "@/components/HomeScreen/TrendingAlbumSection";
import PopularArtistSection from "@/components/HomeScreen/PopularArtistSection";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const name = "Sam";

const artistData = [
  {
    id: 1,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: require("@/assets/images/future_nostalgia.jpeg"),
    viewCount: 20000,
    duration: "3:03",
    description: "THis is a girl",
    followerCount: 20000,
  },
  {
    id: 2,
    title: "After Hours",
    artist: "The Weeknd",
    image: require("@/assets/images/after_hour.jpeg"),
    viewCount: 20000,
    duration: "3:03",
    description: "He is a man",
    followerCount: 20000,
  },
  {
    id: 3,
    title: "Fine Line",
    artist: "Harry Styles",
    image: require("@/assets/images/fine_line.jpg"),
    viewCount: 20000,
    duration: "3:03",
    description: "This is not good",
    followerCount: 20000,
  },
];

const albumData = [
  {
    id: 1,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: require("@/assets/images/future_nostalgia.jpeg"),
  },
  {
    id: 2,
    title: "After Hours",
    artist: "The Weeknd",
    image: require("@/assets/images/after_hour.jpeg"),
  },
  {
    id: 3,
    title: "Fine Line",
    artist: "Harry Styles",
    image: require("@/assets/images/fine_line.jpg"),
  },
];

const HomeScreen = () => {
  const [initialPlayMusic, setInitialPlayMusic] = useState(false);
  const {
    selectedAlbum,
    setSelectedAlbum,
    isMinimized,
    handleMinimizedScreen,
  } = useMusicPlayer();

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
          <PopularArtistSection albumData={albumData} artistData={artistData} />
          <View style={{ marginTop: 120 }}></View>
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
    backgroundColor: "white",
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
