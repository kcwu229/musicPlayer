import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MusicPlayerScreen from "@/components/MusicPlayerPage/MusicPlayerScreen";

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Developing with the music player screen</Text>
      <MusicPlayerScreen albumData={albumData} />
    </View>
  );
};

const albumData = {
  id: 1,
  title: "Future Nostalgia",
  artist: "Dua Lipa",
  image: require("@/assets/images/future_nostalgia.jpeg"),
  viewCount: 20000,
  duration: "3:03",
  likeCount: 20000,
  commentCount: 20000,
};

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

export default LibraryScreen;
