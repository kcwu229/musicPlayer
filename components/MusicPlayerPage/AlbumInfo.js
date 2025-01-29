import { View, Text, StyleSheet } from "react-native";

const albumResultData = {
  id: 1,
  title: "Future Nostalgia",
  artist: "Dua Lipa",
  image: require("../../assets/images/future_nostalgia.jpeg"),
  viewCount: 20000,
  duration: "3:03",
};

const AlbumInfo = ({ title, artist }) => {
  return (
    <View style={styles.infoList}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
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
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  commentSection: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
  },
});

export default AlbumInfo;
