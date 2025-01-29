import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { height, width } = Dimensions.get("window");

exports.MinimizedMusicPlayerHeader = ({ albumData }) => {
  const { title, artist, image } = albumData;
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNextSong = () => {
    console.log("Next song ");
  };

  const handlePlaying = () => {
    isPlaying === true ? console.log("now play") : console.log("paused !");
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.minimizedTopBanner}>
      <Image source={image} style={styles.minimizedImage} />
      <Text style={styles.minimizedTitle}>{title.toUpperCase()}</Text>
      <View style={styles.space}></View>
      {isPlaying ? (
        <Pressable onPress={handlePlaying}>
          <FontAwesome name="play" size={22} style={styles.btnColor} />
        </Pressable>
      ) : (
        <Pressable onPress={handlePlaying}>
          <FontAwesome name="pause" size={22} style={styles.btnColor} />
        </Pressable>
      )}
      <Pressable onPress={handleNextSong}>
        <FontAwesome name="step-forward" size={22} style={styles.btnColor} />
      </Pressable>
    </View>
  );
};

exports.FullScreenMusicPlayerHeader = () => {
  return (
    <View>
      <View style={{ backgroundColor: "black", paddingTop: 25 }}>
        <View
          style={[
            styles.horizontalBar,
            { width: width * 0.13, height: height * 0.01 },
          ]}
        ></View>
      </View>
      <View style={styles.topBanner}>
        <Text style={styles.playText}>Play</Text>
        <FontAwesome name="chevron-down" size={10} style={styles.btnColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  minimizedTopBanner: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  horizontalBar: {
    backgroundColor: "grey",
    alignSelf: "center",
    borderRadius: 20,
  },
  playText: { color: "white", fontSize: 15 },
  topBanner: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "black",
    alignItems: "center",
  },
  artist: {
    color: "white",
    fontSize: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  minimizedTitle: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  space: {
    flexGrow: 2,
  },

  playBtn: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 70,
    alignItems: "center",
    alignContent: "center",
    height: 70,
    justifyContent: "center",
    margin: 10,
  },
  btnColor: {
    color: "white",
    margin: 15,
  },

  minimizedImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});
