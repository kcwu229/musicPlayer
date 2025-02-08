import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import TopBanner from "@/components/HomeScreen/TopBanner";
import SuggestionSection from "@/components/HomeScreen/SuggectionSection";
import ChartSection from "@/components/HomeScreen/ChartSection";
import TrendingAlbumSection from "@/components/HomeScreen/TrendingAlbumSection";
import PopularArtistSection from "@/components/HomeScreen/PopularArtistSection";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const HomeScreen = () => {
  const {
    selectedTrack,
    setSelectedTrack,
    isMinimized,
    handleMinimizedScreen,
    handlePlayTrack,
      setTrackUrl,
    isPlaying,
    setIsPlaying
  } = useMusicPlayer();

  const checkTime = () => {
    let helloWord = "Good Morning";
    const hour = new Date().getHours();
    if (hour > 12 && hour < 18) helloWord = "Good afternoon";
    if (hour >= 18) helloWord = "Good night";
    return helloWord;
  };

  const name = "User";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.container}>
          <TopBanner />
          <Text style={styles.text}>{checkTime()},</Text>
          <Text style={styles.name}>{name}</Text>
          <SuggestionSection setSelectedTrack={setSelectedTrack} setTrackUrl={setTrackUrl} handlePlayTrack={handlePlayTrack} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          <ChartSection />
          <TrendingAlbumSection/>
          <PopularArtistSection/>
          <View style={{ marginTop: 120 }}></View>
        </View>
      </ScrollView>

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
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  name: { fontSize: 28, fontWeight: "normal", marginTop: 5 },
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
