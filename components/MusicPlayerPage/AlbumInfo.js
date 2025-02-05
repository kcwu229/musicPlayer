import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import {useEffect} from "react";

const { height, width } = Dimensions.get("window");

const AlbumInfo = ({ name, artistName }) => {
  useEffect(()=>{
    console.log(name);
  }, [])
  return (
    <View style={styles.infoList}>
      <Animated.Text style={styles.title}>{name.toUpperCase()}</Animated.Text>
      <Text style={styles.artist}>{artistName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playText: { color: "white", fontSize: 13 },
  infoList: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  artist: {
    color: "white",
    fontSize: width > 100 && width < 500 ? 15 : 30,
    marginTop: 10,
    marginHorizontal: width * 0.1,
  },
  title: {
    color: "white",
    fontSize: width > 100 && width < 500 ? 20 : 40,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: width * 0.1,
  },
  commentSection: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
  },
});

export default AlbumInfo;
