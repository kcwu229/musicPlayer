import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  PanResponder,
} from "react-native";
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
  const [initialPlayMusic, setInitialPlayMusic] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  console.log(`isminized : ${isMinimized}`);

  const handleMinimizedScreen = () => {
    if (initialPlayMusic === false) {
      setInitialPlayMusic(!initialPlayMusic);
    }
    setIsMinimized(!isMinimized);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // only swipe down to trigger
        if (gestureState.dy > 100) {
          handleMinimizedScreen();
          return true;
        }
        return false;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Handle pan move
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Handle pan release
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={isMinimized}
        style={styles.container}
      >
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
            isMinimized === false ? styles.fullScreen : styles.minimizedScreen
          }
          {...panResponder.panHandlers}
        >
          <MusicPlayerScreen
            albumData={selectedAlbum}
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
            handleMinimizedScreen={handleMinimizedScreen}
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
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    zIndex: 1,
    width: "100%",
  },
  minimizedScreen: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    zIndex: 1,
    width: "100%",
  },
});

export default HomeScreen;
