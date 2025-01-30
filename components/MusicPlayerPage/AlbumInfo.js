import { View, Text, StyleSheet, Animated } from "react-native";

const AlbumInfo = ({ title, artist }) => {
  return (
    <View style={styles.infoList}>
      <Animated.Text style={styles.title}>{title.toUpperCase()}</Animated.Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playText: { color: "white", fontSize: 13 },
  infoList: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  artist: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  commentSection: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
  },
});

export default AlbumInfo;
