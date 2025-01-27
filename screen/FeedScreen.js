import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import PlayMusicPage from "../components/FeedScreen/PlayMusic";

const FeedScreen = () => <PlayMusicPage />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

export default FeedScreen;
